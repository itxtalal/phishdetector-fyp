import React, { useRef } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumb";
import { BlackSchema, WhiteSchema } from "../../utils/constants";
import { Formik } from "formik";

const url1 = "";
const url2 = "";

const ManageSites = () => {
  const whiteRef = useRef(null);
  const blackRef = useRef(null);

  const handleWhitelist = async (values, { isSubmitting }) => {
    // fetch("");
    const res = await WhiteListDomain(values);
    if (res?.status === 200) isSubmitting(false);

    // console.log(values);
  };

  const handleBlackList = async (values, { isSubmitting }) => {
    const res = await BlackListDomain(values);
    if (res?.status === 200) isSubmitting(false);
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="ManageSites" />

      <div className="grid grid-cols-1 gap-9 px-[25%] sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Manage Sites
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <Formik
                  initialValues={{ domain: "" }}
                  onSubmit={handleBlackList}
                  validationSchema={BlackSchema}
                >
                  {(props) => {
                    const {
                      values,
                      touched,
                      errors,
                      isSubmitting,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                    } = props;

                    return (
                      <form onSubmit={handleSubmit}>
                        <label className="mb-3 block text-black dark:text-white">
                          Add to Black List
                        </label>
                        <input
                          type="text"
                          name="domain"
                          placeholder="Default Input"
                          onChange={handleChange}
                          value={values.domain}
                          onBlur={handleBlur}
                          className={`mb-2 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                            errors.domain && touched.domain
                              ? "focus:ring-red-200"
                              : "focus:ring-blue-200"
                          }`}
                        />
                        {errors.domain && touched.domain && (
                          <div className="text-danger">{errors.domain}</div>
                        )}
                        <button
                          type="submit"
                          className="ml-auto flex items-center justify-center rounded-md bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                          disabled={isSubmitting}
                        >
                          Black list
                        </button>
                      </form>
                    );
                  }}
                </Formik>
              </div>

              <div>
                <Formik
                  initialValues={{ domain: "" }}
                  onSubmit={handleWhitelist}
                  validationSchema={WhiteSchema}
                >
                  {(props) => {
                    const {
                      values,
                      touched,
                      errors,
                      isSubmitting,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                    } = props;

                    return (
                      <form onSubmit={handleSubmit}>
                        <label className="mb-3 block text-black dark:text-white">
                          Add to White List
                        </label>
                        <input
                          type="text"
                          name="domain"
                          placeholder="Default Input"
                          onChange={handleChange}
                          value={values.domain}
                          onBlur={handleBlur}
                          className={`mb-2 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                            errors.domain && touched.domain
                              ? "focus:ring-red-200"
                              : "focus:ring-blue-200"
                          }`}
                        />
                        {errors.domain && touched.domain && (
                          <div className="text-danger">{errors.domain}</div>
                        )}
                        <button
                          type="submit"
                          className="ml-auto flex items-center justify-center rounded-md bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                          disabled={isSubmitting}
                        >
                          White list
                        </button>
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ManageSites;
