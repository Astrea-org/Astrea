import { useFormContext } from "../FormContext";

export default function Details() {
  const { formMethods, formData, setFormData } = useFormContext();
  const { register, handleSubmit } = formMethods;

  const onSubmit = (data: any) => {
    setFormData({ ...formData, details: data });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center font-poppinsRegular">
        <div className="bg-white shadow-2xl px-3 py-6 w-[700px] border border-gray-300 rounded-lg">
          <h1 className="text-3xl font-bold text-center font-poppinsSemiBold">
            Collection Details
          </h1>
          <form
            action=""
            className="mt-4 flex flex-col items-start w-full px-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col w-full">
              <label htmlFor="title" className="text-xl font-semibold">
                Title*
              </label>
              <input
                id="title"
                type="text"
                {...register("name")}
                defaultValue={formData.details.name}
                required
                className="w-full mt-1 rounded-md h-10 border border-gray-500"
              />
            </div>
            <div className="flex flex-col mt-3 w-full">
              <label htmlFor="description" className="text-xl font-semibold">
                Description*
              </label>
              <input
                id="description"
                type="text"
                {...register("description")}
                defaultValue={formData.details.description}
                className="w-full mt-1 rounded-md h-32 border border-gray-500"
              />
            </div>
            <div className="w-full mt-3">
              <p>
                Note: Details entered below will only apply to newly created{" "}
                <br />
                assets, existing assets will not be modified.
              </p>
            </div>
            <div className="bg-gray-300 p-5 mt-3 w-full border-black border rounded-lg">
              <p className="font-bold">
                These assets will use fractionalized tokens
              </p>
              <p className="font-bold mt-2">Fractional tokens *</p>
              <input
                type="number"
                className="mt-1 rounded-md border border-gray-300 p-1"
                {...register("fractionalTokens")}
                defaultValue={formData.details.fractionalTokens}
              />
            </div>
            <div className="mt-3">
              <p className="font-bold">These assets will be transferable ✅</p>
            </div>
            <button type="submit">Save & Next</button>
          </form>
        </div>
      </div>
    </>
  );
}
