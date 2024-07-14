import { useFormContext } from "react-hook-form";
import { IoFileTray } from "react-icons/io5";
import { FaRegFileAlt } from "react-icons/fa";

export default function Details() {
  const { register, watch } = useFormContext();

  const asset = watch();

  return (
    <>
      <div className="flex flex-col justify-center items-center font-poppinsRegular">
        <div className="bg-white shadow-2xl px-3 py-6 w-[700px] border border-gray-300 rounded-lg">
          <h1 className="text-3xl font-bold text-center font-poppinsSemiBold">
            Collection Details
          </h1>
          <form
            action=""
            className="mt-4 flex flex-col items-start w-full px-5 gap-4"
          >
            <div className="flex flex-col w-full">
              <label htmlFor="title" className="text-xl font-semibold">
                Title*
              </label>
              <input
                id="title"
                type="text"
                {...register("title")}
                required
                className="w-full mt-1 rounded-md h-10 border border-gray-500 px-2"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="description" className="text-xl font-semibold">
                Description*
              </label>
              <textarea
                id="description"
                {...register("description")}
                className="w-full mt-1 rounded-md h-32 border border-gray-500 p-2"
              />
            </div>
            {asset.file && asset.file.length > 0 ? (
              <div className="bg-black rounded text-white p-5 inline-flex gap-5 items-center w-full">
                <FaRegFileAlt size={25} />
                {asset.file[0].name}
              </div>
            ) : (
              <div className="w-full">
                <span className="text-xl font-semibold">File*</span>
                <input
                  id="file-input"
                  type="file"
                  className="hidden"
                  {...register("file")}
                />
                <label
                  htmlFor="file-input"
                  className="mt-1 py-10 w-full flex flex-col justify-center font-semibold items-center border-dashed border-4 border-gray-300 rounded-lg"
                >
                  <IoFileTray size={50} />
                  Upload your asset here...*
                </label>
              </div>
            )}
            <div className="mt-3">
              <p className="font-bold inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  className="border border-black w-5 h-5"
                />
                These assets will be transferable
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
