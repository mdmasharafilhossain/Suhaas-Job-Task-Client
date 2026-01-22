/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouteError, isRouteErrorResponse, Link } from "react-router";
import { FiHome, FiRefreshCw, FiAlertTriangle, FiArrowLeft } from "react-icons/fi";

export default function ErrorPage() {
  const error = useRouteError();

  let statusCode = 404;
  let title = "Page Not Found";
  let message = "The page you're looking for doesn't exist or has been moved.";

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    
    switch (error.status) {
      case 400:
        title = "Bad Request";
        message = "The server cannot process the request due to invalid syntax.";
        break;
      case 401:
        title = "Unauthorized";
        message = "You need to be authenticated to access this resource.";
        break;
      case 403:
        title = "Forbidden";
        message = "You don't have permission to access this resource.";
        break;
      case 404:
        title = "Page Not Found";
        message = "The page you're looking for doesn't exist or has been moved.";
        break;
      case 500:
        title = "Internal Server Error";
        message = "Something went wrong on our end. Please try again later.";
        break;
      case 503:
        title = "Service Unavailable";
        message = "The server is temporarily unable to handle the request.";
        break;
      default:
        title = `Error ${error.status}`;
        message = error.statusText || "An unexpected error occurred.";
    }
  } else if (error instanceof Error) {
    title = "Application Error";
    message = error.message || "Something went wrong in the application.";
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="h-3 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
          
          <div className="p-8 sm:p-12">
            <div className="text-center mb-10">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-full bg-linear-to-br from-red-50 to-pink-100 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-linear-to-br from-red-100 to-pink-200 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-linear-to-br from-red-200 to-pink-300 flex items-center justify-center shadow-inner">
                      <FiAlertTriangle className="w-10 h-10 text-red-600" />
                    </div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-red-600 to-pink-700 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">{statusCode}</span>
                  </div>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
                {title}
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                {message}
              </p>

              <div className="inline-block px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-8">
                <p className="text-sm text-red-700 font-medium">
                  Error Code: {statusCode}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-100 to-indigo-100 flex items-center justify-center mr-3">
                    <FiHome className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Go Home</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Return to the homepage and start fresh
                </p>
                <Link
                  to="/"
                  className="block w-full py-2.5 px-4 text-center rounded-lg font-medium text-white bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-300"
                >
                  Go to Homepage
                </Link>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-lg bg-linear-to-br from-green-100 to-emerald-100 flex items-center justify-center mr-3">
                    <FiRefreshCw className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Reload Page</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Try refreshing the page to resolve temporary issues
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full py-2.5 px-4 rounded-lg font-medium text-white bg-linear-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 transition-all duration-300"
                >
                  Refresh Page
                </button>
              </div>
            </div>

            <div className="text-center">
              <Link
                to={-1 as any}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <FiArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Link>
            </div>
          </div>

          <div className="h-3 bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600"></div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Contact Support
            </a>
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a
              href="/"
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Contact
            </a>
            <a
              href="/privacy"
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}