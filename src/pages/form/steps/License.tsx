import { liscData } from "../../../utils/data/liscData";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { IoFileTray } from "react-icons/io5";

export default function License() {
  const [selectedLicense, setSelectedLicense] = useState<string>("");
  const [banner, setBanner] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");

  const { register, watch, setValue } = useFormContext();

  const asset = watch();

  const handleSelection = (title: string) => {
    setSelectedLicense(title);
    setValue("license", title);
  };
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files) {
      setBanner(URL.createObjectURL(e.target.files[0]));
      setValue("banner", [e.target.files[0]]);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files) {
      setThumbnail(URL.createObjectURL(e.target.files[0]));
      setValue("thumbnail", [e.target.files[0]]);
    }
  };
  useEffect(() => {
    console.log(asset);
    console.log(banner);
  });
  return (
    <div>
      <div className="flex flex-col justify-center items-center font-poppinsRegular">
        <div className="bg-white shadow-2xl px-3 py-6 w-[700px] border border-gray-300 rounded-lg">
          <form action="" className="flex flex-col gap-5">
            <div className="flex justify-between">
              <p className="text-lg font-bold">Universal Data License</p>
            </div>
            <div>
              {liscData.map((item: any) => (
                <div
                  key={item.title}
                  className={`border border-gray-600 p-3 mt-6 rounded-lg hov ${
                    selectedLicense === item.title
                      ? "bg-[#454FA8] text-white"
                      : ""
                  }`}
                  onClick={() => handleSelection(item.title)}
                >
                  <h1 className="font-bold">{item.title}</h1>
                  <p className="mt-2">{item.desc}</p>
                  <input
                    type="radio"
                    value={item.title}
                    checked={selectedLicense === item.title}
                    className="hidden"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-row gap-4">
              {asset.banner && asset.banner.length > 0 ? (
                <div className="flex mx-auto">
                  <div className="shadow-md p-4 rounded font-semibold">
                    <img
                      src={banner}
                      alt="Selected"
                      className="w-60 h-40 object-cover rounded-lg"
                    />
                    {asset.banner[0].name}
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <input
                    id="file-input"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    {...register("banner")}
                    onChange={(newfile) => handleBannerChange(newfile)}
                  />
                  <label htmlFor="file-input" className="font-semibold">
                    Banner
                    <div className="mt-2 py-10 w-full flex flex-col justify-center  items-center border-dashed border-4 border-gray-300 rounded-lg">
                      <IoFileTray size={50} />
                      Upload your Banner here...
                    </div>
                  </label>
                </div>
              )}
              {asset.thumbnail && asset.thumbnail.length > 0 ? (
                <div className="flex mx-auto">
                  <div className="shadow-md p-4 rounded font-semibold">
                    <img
                      src={thumbnail}
                      alt="Selected"
                      className="w-60 h-40 object-cover rounded-lg"
                    />
                    {asset.banner[0].name}
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <input
                    id="file-input2"
                    type="file"
                    className="hidden"
                    {...register("thumbnail")}
                    accept="image/*"
                    onChange={(newfile) => handleThumbnailChange(newfile)}
                  />
                  <label htmlFor="file-input2" className="font-semibold">
                    Thumbnail
                    <div className="mt-2 py-10 w-full flex flex-col justify-center font-semibold items-center border-dashed border-4 border-gray-300 rounded-lg">
                      <IoFileTray size={50} />
                      Upload your Thumbnail here...
                    </div>
                  </label>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
