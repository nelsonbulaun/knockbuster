import { Link } from "react-router-dom";

export const SplitScreen = (props) => {
  return (
    <div className="h-full w-full">
      <div className="divider pt-0 mt-0" />

      <div className="h-[90vh] w-full flex justify-center items-center relative -top-20">
        <div className="h-[50vh] w-1/2 justify-center flex flex-col items-center bg-blockbuster-yellow divide-y-2 relative shadow-lg rounded-md">
          <div className="h-full container shadow-sm flex flex-row justify-center items-center absolute rounded-l-lg">
            <div
              className="h-[50vh] basis-1/2 flex justify-center items-center relative rounded-l-lg"
              style={{
                backgroundImage: `url(${props.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderTopLeftRadius: "0.5rem",
              }}
            >
              <div className="absolute inset-0 bg-yellow-500 opacity-50 rounded-l-lg"></div>
              <Link to="/">
                <div id="logo" className="w-fit rotate-355 bg-[white]/30 p-2">
                  <div
                    id="logo"
                    className="w-fit border border-[#1b4796] border-r-0 p-2"
                  >
                    <h1 id="titleinverted" className="text-3xl">
                      {" "}
                      KnockBuster{" "}
                    </h1>
                  </div>
                </div>
              </Link>
            </div>
            <div className="basis-1/2 rounded-r-lg shadow-sm flex flex-col sm:py-12 items-center bg-blockbuster-yellow h-full justify-center relative">
              <div className="justify-start flex flex-col">
                <div className="text-left pb-3">
                  <h1 className="secondaryTitle  text-[#1b4796] text-3xl">
                    {props.title}
                  </h1>
                  {props.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
