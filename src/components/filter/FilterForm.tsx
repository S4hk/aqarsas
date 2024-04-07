import { ChangeEvent, useState } from "react";
import { SelectedData } from "../../types";

type Props = { setSelectedData: (formData: SelectedData) => void };

function FilterForm({ setSelectedData }: Props) {
  const [formData, setFormData] = useState({ date: "2022-01-05" });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSelectedData(formData);
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <form
        className=" md:items-center items-stretch justify-center flex gap-2 border p-4 rounded-md shadow-md   flex-col md:flex-row"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-2 items-center">
          <label htmlFor="area" className=" mb-2  font-medium text-gray-900 ">
            المنطقة:
          </label>
          <select
            onChange={handleChange}
            name="state"
            id="area"
            className="bg-gray-50 border border-gray-300 flex-grow-1 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option>الكل</option>
            <option value="0">الرياض</option>
            <option value="1">مكة المكرمة</option>
            <option value="2">المدينة المنورة</option>
            <option value="3">القصيم</option>
            <option value="4">الشرقية</option>
            <option value="5">عسير</option>
            <option value="6">تبوك</option>
            <option value="7">حائل</option>
            <option value="8">الحدود الشمالية</option>
            <option value="9">جازان</option>
            <option value="10">نجران</option>
            <option value="11">الباحة</option>
            <option value="12">الجوف</option>
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="area" className=" mb-2  font-medium text-gray-900 ">
            الفترة الزمنية:
          </label>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              type="date"
              name="date"
              defaultValue={"2022-01-05"}
              onChange={handleChange}
              max="2022-01-05"
              min="2009-09-01"
              className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 "
              placeholder="Select date"
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 "
        >
          تغير
        </button>
      </form>
    </>
  );
}

export default FilterForm;
