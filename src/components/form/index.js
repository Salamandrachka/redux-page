import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { clearCheckout } from "../../redux/actions/cartAction";

const defaultTextError = Yup.string()
  .matches(/^[A-Za-z]+$/, "Only letters allowed")
  .min(2, "min 2 letters required")
  .max(20, "only 20 letters allowed")
  .required("This field is required");

const validationSchema = Yup.object({
  firstName: defaultTextError,
  lastName: defaultTextError,
  age: Yup.date()
    .required()
    .test("age", "You must be 18 or older", function (birthdate) {
      const cutoff = new Date();
      cutoff.setFullYear(cutoff.getFullYear() - 18);
      return birthdate <= cutoff;
    }),
  address: Yup.string()
    .min(2, "min 2 letters required")
    .max(50, "only 50 letters allowed")
    .required("This field is required"),
  phone: Yup.string()
    .min(10, "min 10 digits required")
    .max(13, "only 13 digits allowed")
    .required("This field is required"),
});

export default function Form() {
  const dispatch = useDispatch();
  const formik = useFormik({
    //об'єкт опшинів
    initialValues: {
      //назви полів
      firstName: "",
      lastName: "",
      age: 0,
      address: "",
      phone: "",
    },
    //validationSchema: name
    validationSchema,

    onSubmit: (values) => {
      console.log(values);
      dispatch(clearCheckout());
    },
  });

  return (
    <div className="form-wrapper">
      <form className="form" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          id="firtName"
          name="firstName"
          placeholder="Введіть своє ім'я"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <label htmlFor="firstName">
          {formik.touched.firstName && formik.errors.firstName
            ? formik.errors.firstName
            : ""}
        </label>

        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Введіть своє прізвище"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <label htmlFor="lastName">
          {formik.touched.lastName && formik.errors.lastName
            ? formik.errors.lastName
            : ""}
        </label>

        <input
          type="date"
          id="age"
          name="age"
          placeholder="Введіть свій вік"
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <label htmlFor="age">
          {formik.touched.age && formik.errors.age ? formik.errors.age : ""}
        </label>

        <input
          type="text"
          id="address"
          name="address"
          placeholder="Введіть свою адресу доставки"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <label htmlFor="address">
          {formik.touched.address && formik.errors.address
            ? formik.errors.address
            : ""}
        </label>

        <input
          type="number"
          id="phone"
          name="phone"
          placeholder="Введіть свій мобільний телефон"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <label htmlFor="phone">
          {formik.touched.phone && formik.errors.phone
            ? formik.errors.phone
            : ""}
        </label>
        <button type="submit">Check Out</button>
      </form>
    </div>
  );
}
