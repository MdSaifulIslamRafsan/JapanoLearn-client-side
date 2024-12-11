import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <div className="boxShadow px-10 w-full lg:flex-row gap-[30px] lg:gap-0 flex-col flex items-center justify-evenly py-20 rounded-xl">
        <div className="w-full lg:w-1/2">
          <img
            src="/detective-animation-404-error-page.gif"
            alt="illustration"
            className="w-full"
          />
        </div>

        <div className="w-full lg:w-1/2 text-center ">
          <h1 className="text-[2.5rem] sm:text-[4rem] font-[800] text-blue-500 leading-[80px]">
            OOPS!
          </h1>

          <p>Sorry, This Page Was {error.statusText || error.message}.</p>
          <p className="">
            But{` don't`} worry, you can find plenty of other things on our
            homepage.
          </p>

          <Link
            href="/"
            className="py-3 inline-block px-6 sm:px-8 text-[0.9rem] sm:text-[1rem] rounded-full bg-blue-600 text-white mt-4"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </>
  );
}
