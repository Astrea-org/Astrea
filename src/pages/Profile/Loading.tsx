import Skeleton from "react-loading-skeleton";

export const Loading = () => {
  return (
    <div>
      return (
      <div className="bg-white min-h-screen">
        <div className="max-w-screen-xl px-4 py-8 mx-auto mt-24">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <Skeleton
                circle={true}
                height={112}
                width={112}
                baseColor="#d1d5db"
              />
              <div className="mt-6">
                <p className="text-lg font-bold">
                  <Skeleton width={100} baseColor="#d1d5db" />
                </p>
                <p>
                  <Skeleton width={200} baseColor="#d1d5db" />
                </p>
              </div>
            </div>
            <div>
              <Skeleton width={120} height={40} baseColor="#d1d5db" />
            </div>
          </div>
          <div className="mt-12">
            <p className="text-lg font-bold">
              <Skeleton width={80} baseColor="#d1d5db" />
            </p>
            <p className="mt-2">
              <Skeleton count={3} baseColor="#d1d5db" />
            </p>
          </div>
          <div className="mt-12">
            <p className="text-lg font-bold">
              <Skeleton width={100} baseColor="#d1d5db" />
            </p>
            <p className="mt-2">
              <Skeleton count={2} baseColor="#d1d5db" />
            </p>
          </div>
        </div>
      </div>
      );
    </div>
  );
};
