addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  let url = new URL(request.url);
  let path = url.pathname;
  
  if(path === "/") {
    let headers = [];
    for (let [key, value] of request.headers) {
      headers.push(`${key}: ${value}`);
    }
    return new Response(headers.join("\n"), {status: 200});
  }
  
  if(path.startsWith("/generate_")) {
    let status = parseInt(path.slice(10));
    if(status >= 100 && status < 600) {
      return new Response(`${status} ${httpStatusText(status)}`, {status});
    }
  }

  return new Response('Not Found', {status: 404});
}

function httpStatusText(status) {
  switch(status) {
    case 100: return 'Continue';
    case 102: return 'Processing';
    case 103: return 'Early Hints';
    default: return '';
  }
}
