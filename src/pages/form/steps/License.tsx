import { IoMdInformationCircle } from "react-icons/io";
import { liscData } from "../../../utils/data/liscData";

export default function License() {
  return (
    <div>
      {" "}
      <div className="flex flex-col justify-center items-center font-poppinsRegular">
        <div className="bg-white shadow-2xl px-3 py-6 w-[700px] border border-gray-300 rounded-lg">
          <form action="">
            <div className="flex justify-between">
              <p className="text-lg font-bold">Universal Data License</p>
              <p className="text-lg">This asset will contain a license ✅</p>
            </div>
            <div>
              {liscData.map((item: any) => (
                <>
                  <div className="bg-gray-200 border border-gray-600 p-3 mt-6 rounded-lg hover:bg-[#454FA8]">
                    <h1 className="font-bold">{item.title}</h1>
                    <p className="mt-2">{item.desc}</p>
                  </div>
                </>
              ))}
            </div>
            <div>
              <p className="text-lg font-bold mt-3 flex">
                Banner{" "}
                <span className="mt-[6px] ml-3">
                  <IoMdInformationCircle />
                </span>
              </p>
              <input type="file" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
