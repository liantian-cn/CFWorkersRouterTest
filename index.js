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
    case 200: return 'OK';
	case 201: return 'Created';
	case 202: return 'Accepted';
	case 203: return 'Non-Authoritative Information';
	case 204: return 'No Content';
	case 205: return 'Reset Content';
	case 207: return 'Multi-Status';
	case 208: return 'Already Reported';
	case 226: return 'IM Used';
	case 300: return 'Multiple Choices';
	case 302: return 'Found';
	case 303: return 'See Other';
	case 304: return 'Not Modified';
	case 400: return 'Bad Request';
	case 401: return 'Unauthorized';
	case 402: return 'Payment Required';
	case 403: return 'Forbidden';
	case 404: return 'Not Found';
	case 405: return 'Method Not Allowed';
	case 406: return 'Not Acceptable';
	case 408: return 'Request Timeout';
	case 409: return 'Conflict';
	case 410: return 'Gone';
	case 411: return 'Length Required';
	case 412: return 'Precondition Failed';
	case 413: return 'Content Too Large';
	case 414: return 'URI Too Long';
	case 415: return 'Unsupported Media Type';
	case 416: return 'Range Not Satisfiable';
	case 417: return 'Expectation Failed';
	case 418: return 'I\'m a teapot';
	case 421: return 'Misdirected Request';
	case 422: return 'Unprocessable Content';
	case 423: return 'Locked';
	case 424: return 'Failed Dependency';
	case 425: return 'Too Early';
	case 429: return 'Too Many Requests';
	case 431: return 'Request Header Fields Too Large';
	case 451: return 'Unavailable For Legal Reasons';
	case 500: return 'Internal Server Error';
	case 501: return 'Not Implemented';
	case 502: return 'Bad Gateway';
	case 503: return 'Service Unavailable';
	case 504: return 'Gateway Timeout';
	case 505: return 'HTTP Version Not Supported';
	case 506: return 'Variant Also Negotiates';
	case 507: return 'Insufficient Storage';
	case 508: return 'Loop Detected';
	case 510: return 'Not Extended';
	case 511: return 'Network Authentication Required';
    default: return '';
  }
}

