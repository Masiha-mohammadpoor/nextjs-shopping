import SelectOption from "@/common/Select";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { TagsInput } from "react-tag-input-component";
import Loading from "./Loading";
import Input from "@/common/Input";

const ProductForm = ({
  onSubmit,
  title,
  fields,
  formChangeHandler,
  formData,
  category,
  setCategory,
  categories,
  tags,
  setTags,
  isPending,
  btnText
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
      {/* tags input */}
      <div>
        <label className="inline-block text-white mb-3 text-sm">
          دسته بندی
        </label>
        <SelectOption
          defaultValue={category}
          value={category}
          onChange={setCategory}
          options={categories}
        />
      </div>
      {/* react select */}
      <div>
        <label className="inline-block text-white mb-3 text-sm">تگ ها</label>
        <TagsInput
          value={tags}
          onChange={setTags}
          name="tags"
          classNames={{
            input: "bg-transparent focus:border-none text--white",
            tag: "text--white",
          }}
        />
      </div>
      <button
        type="submit"
        className="mt-7 flex justify-center items-center transition-all duration-500 w-44 glassmorphism rounded-xl p-2 text--white hover:bg-blue-700"
      >
        {isPending ? <Loading size={10} /> : btnText}
      </button>
    </form>
  );
};

export default ProductForm;
