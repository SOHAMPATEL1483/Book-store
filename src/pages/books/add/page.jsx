import { useFormik } from "formik";
import { useSearchParams } from "react-router-dom";
import { Input } from "../../../Components/ui/input";
import { Button } from "../../../Components/ui/button";
import { useToast } from "../../../Components/ui/use-toast";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../../services/constants";
import { toast } from "react-hot-toast";

import * as Yup from "yup";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const AddBook = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const { getFieldProps, touched, errors, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        name: "",
        description: "",
        price: 0,
        categoryId: 1,
        base64image: "",
      },

      onSubmit: async (values) => {
        let x = new File([values.base64image], values.base64image.name);
        if (x.size > 10000)
          toast.error("please upload file with size less than 10kb", {
            position: "bottom-right",
          });
        console.log(x.size);

        values.base64image = await toBase64(values.base64image);
        console.log(values);
        try {
          const { data, errors } = await axios.post(
            `${API_URL}/api/book/`,
            values
          );
          if (data)
            toast.success("successfully added your book", {
              position: "bottom-right",
            });
          console.log(data);
          console.log(errors);
        } catch (error) {
          if (error instanceof AxiosError) console.log(error.response.data);
        }
      },
    });
  return (
    <>
      <h1 className="font-bold text-3xl text-center my-10">Add Books</h1>

      <div className="max-w-3xl mx-auto grid grid-cols-2 gap-8 my-10">
        <div>
          <label>Name</label>
          <Input
            type="text"
            id="name"
            label="name"
            {...getFieldProps("name")}
            className="border border-gray-400"
          />
          {touched.name && errors.name ? (
            <p className="text-red-500">{errors.name}</p>
          ) : null}
        </div>
        <div>
          <label>Description</label>
          <Input
            type="text"
            id="description"
            label="description"
            {...getFieldProps("description")}
            className="border border-gray-400"
          />
          {touched.email && errors.email ? (
            <p className="text-red-500">{errors.email}</p>
          ) : null}
        </div>
        <div>
          <label>Price</label>
          <Input
            type="number"
            id="price"
            label="price"
            {...getFieldProps("price")}
            className="border border-gray-400"
          />
          {touched.price && errors.price ? (
            <p className="text-red-500">{errors.price}</p>
          ) : null}
        </div>
        <div>
          <label>categoryId</label>
          <Input
            type="number"
            id="categoryId"
            label="categoryId"
            {...getFieldProps("categoryId")}
            className="border border-gray-400"
          />
          {touched.categoryId && errors.categoryId ? (
            <p className="text-red-500">{errors.categoryId}</p>
          ) : null}
        </div>
        <div>
          <label>image</label>
          <Input
            type="file"
            id="base64image"
            label="base64image"
            onBlur={getFieldProps("base64image").onBlur}
            className="border border-gray-300"
            onChange={(event) => {
              setFieldValue("base64image", event.currentTarget.files[0]);
            }}
          />
          {touched.base64image && errors.base64image ? (
            <p className="text-red-500">{errors.base64image}</p>
          ) : null}
        </div>
        <Button
          type="submit"
          className="row-start-4"
          onClick={() => handleSubmit()}
        >
          Create Book
        </Button>
      </div>
    </>
  );
};

export default AddBook;
