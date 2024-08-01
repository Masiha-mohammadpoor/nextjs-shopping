import { toPersianDigits } from "@/utils/toPersianDigits";
import Loading from "./Loading";
import Input from "@/common/Input";

const CategoryForm = ({
  onSubmit,
  title,
  fields,
  formChangeHandler,
  formData,
  isPending,
  btnText,
}) => {
  return (
    <form onSubmit={onSubmit} className="w-[300px] flex gap-y-4 flex-col">
      <h1 className="text--white text-lg font-bold mb-1">{title}</h1>
      {fields.map((field) => {
        return (
          <div key={field.name}>
            <Input
              label={field.label}
              name={field.name}
              onChange={formChangeHandler}
              value={toPersianDigits(formData[field.name])}
              disabled={false}
            />
          </div>
        );
      })}
      <button
        type="submit"
        className="mt-7 flex justify-center items-center transition-all duration-500 w-44 glassmorphism rounded-xl p-2 text--white hover:bg-blue-700"
      >
        {isPending ? <Loading size={10} /> : btnText}
      </button>
    </form>
  );
};

export default CategoryForm;
