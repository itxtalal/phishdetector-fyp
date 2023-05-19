import Logo from './logo.png';
import Blocked from './blocked.png';

export default function () {
  return (
    <section className="bg-gray-900 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8">
            <img src={Logo} className="mx-auto" />
          </div>
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Smart, Secure and Seamless.
            <span className="sm:block leading-snug">
              Your AI guard against Phishing.{' '}
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl sm:text-xl sm:leading-relaxed">
            PhishDetector combines lexical ML models with existing datasets to
            detect phishing URLs effectively.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="https://github.com/itxtalal/phishdetector-fyp/releases/tag/v1.1"
            >
              Get the extension
            </a>

            <a
              className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="#demo"
            >
              Demo
            </a>
            <a
              className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="http://dashboard.phishdetector.live"
            >
              Analytics Dashboard (Admin Only)
            </a>
          </div>
        </div>
      </div>
      <div
        className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center"
        id="demo"
      >
        <div className="w-1/2">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Automatically detects phishing URLs on your webpages
          </h1>
        </div>
        <div className="mx-auto text-center">
          <h1 className="bg-gradient-to-r text-white bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Demo
          </h1>
          <p className="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed">
            The URLs on the left are identified Phishing URLs.
          </p>
          <p className="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed">
            If you have the extension installed,{' '}
            <span className="text-red-500">
              they will be highlighted in red.
            </span>
          </p>

          <div className="flex flex-row justify-center mt-9">
            <div className="mr-8">
              <h2 className="text-3xl mb-3">Malicious</h2>
              <div>
                <a href="https://amazon-ish.vercel.app/">
                  https://amazon-ish.vercel.app/
                </a>
                <br />
                <a href="https://am22fcu.firebaseapp.com/">
                  https://am22fcu.firebaseapp.com/
                </a>
                <br />
                <a href="http://an-bcna.weeblysite.com">
                  http://an-bcna.weeblysite.com
                </a>
                <br />
                <a href="http://apple.maps-auth.com">
                  http://apple.maps-auth.com
                </a>
                <br />
                <a href="http://applitronix.com">http://applitronix.com</a>
                <br />
                <a href="http://att-106750107115.square.site">
                  http://att-106750107115.square.site
                </a>
                <br />
              </div>
            </div>
            <div className="ml-8">
              <h2 className="text-3xl mb-3">Safe</h2>
              <div>
                <a href="https://www.google.com">https://google.com</a>
                <br />
                <a href="https://www.github.com">https://www.github.com</a>
                <br />
                <a href="https://www.github.dev">https://github.dev</a>
                <br />
                <a href="https://www.facebook.com">https://www.facebook.com</a>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center"
        id="demo"
      >
        <div className="w-1/2">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Disallow access to any websites that are identified as phishing
          </h1>
        </div>
        <div className="mx-auto text-center w-1/2">
          <h1 className="bg-gradient-to-r text-white bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Demo
          </h1>

          <div className="flex flex-row justify-center mt-9">
            <img src={Blocked} />
          </div>
        </div>
      </div>
    </section>
  );
}
