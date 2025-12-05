import React, { useContext, useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import SectionTitle from "../../shared/SectionTitle";
import { ThemeContext } from "../../context/ThemeContext";
import { AiOutlineArrowLeft } from "react-icons/ai";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCourse = () => {
  const { courseId } = useParams(); // get courseId from URL
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);

  const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      category: "",
      description: "",
      price: "",
      duration: "",
      tags: [""],
      thumbnail: "",
      instructor: { id: "", name: "", email: "", designation: "", experience: "", bio: "", profileImage: "" },
      syllabus: [{ week: 1, topic: "", details: [""] }],
      classSchedule: [""],
      courseOutline: [""],
      batches: [{ batchId: "", name: "", startDate: "" }],
    }
  });

  // Field arrays
  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({ control, name: "tags" });
  const { fields: syllabusFields, append: appendSyllabus, remove: removeSyllabus } = useFieldArray({ control, name: "syllabus" });
  const { fields: classFields, append: appendClass, remove: removeClass } = useFieldArray({ control, name: "classSchedule" });
  const { fields: outlineFields, append: appendOutline, remove: removeOutline } = useFieldArray({ control, name: "courseOutline" });
  const { fields: batchFields, append: appendBatch, remove: removeBatch } = useFieldArray({ control, name: "batches" });

  // Fetch existing course
useEffect(() => {
  setLoading(true);
  axiosSecure.get(`/api/courses/${courseId}`)
    .then(res => {
      let course = res.data.data;

      // Map field arrays to include a unique `id` (required by useFieldArray)
      course.tags = course.tags?.length ? course.tags : [""];
      course.syllabus = course.syllabus?.length
        ? course.syllabus.map((s) => ({ ...s, details: s.details || [""] }))
        : [{ week: 1, topic: "", details: [""] }];
      course.classSchedule = course.classSchedule?.length ? course.classSchedule : [""];
      course.courseOutline = course.courseOutline?.length ? course.courseOutline : [""];
      course.batches = course.batches?.length
        ? course.batches.map((b) => ({ ...b }))
        : [{ batchId: "", name: "", startDate: "" }];

      // Instructor exists
      course.instructor = course.instructor || {
        id: "",
        name: "",
        email: "",
        designation: "",
        experience: "",
        bio: "",
        profileImage: "",
      };

      reset(course); // prefill all form fields
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching course:", err);
      Swal.fire({ title: "Error!", text: "Cannot fetch course data", icon: "error" });
      setLoading(false);
    });
}, [courseId, reset, axiosSecure]);

  const onSubmit = (data) => {
    try {
      data.tags = data.tags.filter(tag => tag.trim() !== "");
      const updatedData = {
        ...data,
        price: Number(data.price),
        syllabus: data.syllabus.map(s => ({ ...s, week: Number(s.week) })),
        updatedByName: user?.displayName || "Unknown User",
        updatedByEmail: user?.email || "No Email",
        updatedAt: new Date().toISOString(),
      };

      axiosSecure.put(`/api/courses/${courseId}`, updatedData, {
        headers: { "Content-Type": "application/json" }
      }).then(res => {
        Swal.fire({
          title: "Course Updated!",
          text: "Your course has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => navigate(-1)); // go back after update
      }).catch(err => {
        console.error("Error updating course:", err);
        Swal.fire({ title: "Error!", text: "Something went wrong.", icon: "error" });
      });

    } catch (error) {
      console.error("Error in submit:", error);
      Swal.fire({ title: "Error!", text: "Something went wrong.", icon: "error" });
    }
  };

  if (loading) return <p className="text-center mt-20">Loading course data...</p>;

  // Theme classes (same as AddCourse)
  const bg = isDarkMode ? " text-gray-200" : " text-gray-900";
  const cardBg = isDarkMode ? "bg-indigo-900 text-gray-200 shadow-lg" : "bg-purple-100 text-gray-900 shadow-lg";
  const inputBg = isDarkMode ? "bg-indigo-900 text-gray-200 placeholder-gray-400 border-gray-600" : "bg-purple-100 text-gray-900 placeholder-gray-500 border-gray-300";
  const sectionTitleColor = isDarkMode ? "text-white" : "text-black";
  const btnTheme = isDarkMode ? "bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 text-white" : "bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 text-white";
  const removeBtn = isDarkMode ? "text-red-400" : "text-red-600";

  return (
    <div className={`${bg} min-h-screen transition-colors duration-500`}>
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="Update Course" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6  p-8 rounded-2xl  shadow-2xl"
        >
          {/* Basic Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Title:</label>
              <input
                {...register("title", { required: "Title is required" })}
                className={`border p-2 rounded w-full ${inputBg}`}
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Category:</label>
              <input
                {...register("category", { required: "Category is required" })}
                className={`border p-2 rounded w-full ${inputBg}`}
              />
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </div>

            <div className="lg:col-span-2">
              <label className="block font-semibold">Description:</label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className={`border p-2 rounded w-full ${inputBg}`}
                rows={3}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Price:</label>
              <input
                type="number"
                {...register("price", {
                  required: "Price is required",
                  min: 0,
                })}
                className={`border p-2 rounded w-full ${inputBg}`}
              />
            </div>

            <div>
              <label className="block font-semibold">Duration:</label>
              <input
                {...register("duration", { required: "Duration is required" })}
                className={`border p-2 rounded w-full ${inputBg}`}
              />
            </div>
          </div>

          {/* Tags */}
          <SectionTitle title="Tags" className={sectionTitleColor} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {tagFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`tags.${index}`)}
                  className={`border p-2 rounded flex-1 ${inputBg}`}
                />
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className={`${removeBtn}`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => appendTag("")}
              className={`${
                isDarkMode ? "text-white " : "text-black"
              } font-bold`}
            >
              Add Tag
            </button>

            <button
              type="button"
              className="flex items-center gap-1 text-blue-500"
            >
              <AiOutlineArrowLeft /> Click here
            </button>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block font-semibold">Thumbnail URL:</label>
            <input
              {...register("thumbnail")}
              className={`border p-2 rounded w-full ${inputBg}`}
            />
          </div>

          {/* Instructor Info */}
          <SectionTitle title="Instructor Info" className={sectionTitleColor} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label>Instructor ID:</label>
              <input
                {...register("instructor.id")}
                className={`border p-2 rounded w-full ${inputBg}`}
              />
            </div>
            <div>
              <label>Name:</label>
              <input
                {...register("instructor.name")}
                className={`border p-2 rounded w-full ${inputBg}`}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                {...register("instructor.email")}
                className={`border p-2 rounded w-full ${inputBg}`}
              />
            </div>
            <div>
              <label>Designation:</label>
              <input
                {...register("instructor.designation")}
                className={`border p-2 rounded w-full ${inputBg}`}
              />
            </div>
            <div>
              <label>Experience:</label>
              <input
                {...register("instructor.experience")}
                className={`border p-2 rounded w-full ${inputBg}`}
              />
            </div>
            <div className="lg:col-span-2">
              <label>Bio:</label>
              <textarea
                {...register("instructor.bio")}
                className={`border p-2 rounded w-full ${inputBg}`}
              />
            </div>
            <div className="lg:col-span-2">
              <label>Profile Image URL:</label>
              <input
                {...register("instructor.profileImage")}
                className={`border p-2 rounded w-full ${inputBg}`}
              />
            </div>
          </div>

          {/* Syllabus */}
          <SectionTitle title="Syllabus" className={sectionTitleColor} />
          {syllabusFields.map((field, index) => (
            <div key={field.id} className={`border p-2 rounded mb-2 ${cardBg}`}>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                <div>
                  <label>Week:</label>
                  <input
                    type="number"
                    {...register(`syllabus.${index}.week`)}
                    className={`border p-1 rounded w-full ${inputBg}`}
                  />
                </div>
                <div className="lg:col-span-3">
                  <label>Topic:</label>
                  <input
                    {...register(`syllabus.${index}.topic`)}
                    className={`border p-1 rounded w-full ${inputBg}`}
                  />
                </div>
              </div>
              <Controller
                control={control}
                name={`syllabus.${index}.details`}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Details comma separated"
                    className={`border p-1 rounded w-full mt-1 ${inputBg}`}
                    onChange={(e) => field.onChange(e.target.value.split(","))}
                  />
                )}
              />
              <button
                type="button"
                onClick={() => removeSyllabus(index)}
                className={`mt-1 ${removeBtn}`}
              >
                Remove Week
              </button>
            </div>
          ))}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() =>
                appendSyllabus({
                  week: syllabusFields.length + 1,
                  topic: "",
                  details: [""],
                })
              }
              className={`${
                isDarkMode ? "text-white" : "text-black"
              } font-bold`}
            >
              Add Week
            </button>
            <button
              type="button"
              className="flex items-center gap-1 text-blue-500"
            >
              <AiOutlineArrowLeft /> Click here
            </button>
          </div>

          {/* Class Schedule */}
          <SectionTitle title="Class Schedule" className={sectionTitleColor} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {classFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`classSchedule.${index}`)}
                  className={`border p-2 rounded flex-1 ${inputBg}`}
                />
                <button
                  type="button"
                  onClick={() => removeClass(index)}
                  className={`${removeBtn}`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => appendClass("")}
              className={`${
                isDarkMode ? "text-white" : "text-black"
              } font-bold`}
            >
              Add Class Schedule
            </button>
            <button
              type="button"
              className="flex items-center gap-1 text-blue-500"
            >
              <AiOutlineArrowLeft /> Click here
            </button>
          </div>

          {/* Course Outline */}
          <SectionTitle title="Course Outline" className={sectionTitleColor} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {outlineFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`courseOutline.${index}`)}
                  className={`border p-2 rounded flex-1 ${inputBg}`}
                />
                <button
                  type="button"
                  onClick={() => removeOutline(index)}
                  className={`${removeBtn}`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-4 items-center">
            <button
              type="button"
              onClick={() => appendOutline("")}
              className={`${
                isDarkMode ? "text-white" : "text-black"
              } font-bold`}
            >
              Add Course Outline
            </button>

            <button
              type="button"
              className="flex items-center gap-1 text-blue-500"
            >
              <AiOutlineArrowLeft /> Click here
            </button>
          </div>

          {/* Batches */}
          <SectionTitle title="Batches" className={sectionTitleColor} />
          {batchFields.map((field, index) => (
            <div
              key={field.id}
              className={`border p-2 rounded mb-2 grid grid-cols-1 lg:grid-cols-3 gap-2 ${cardBg}`}
            >
              <div>
                <label>Batch ID:</label>
                <input
                  {...register(`batches.${index}.batchId`)}
                  className={`border p-1 rounded w-full ${inputBg}`}
                />
              </div>
              <div>
                <label>Name:</label>
                <input
                  {...register(`batches.${index}.name`)}
                  className={`border p-1 rounded w-full ${inputBg}`}
                />
              </div>
              <div>
                <label>Start Date:</label>
                <input
                  type="date"
                  {...register(`batches.${index}.startDate`)}
                  className={`border p-1 rounded w-full ${inputBg}`}
                />
              </div>
              <button
                type="button"
                onClick={() => removeBatch(index)}
                className={`text-red-500 mt-1 lg:col-span-3 ${removeBtn}`}
              >
                Remove Batch
              </button>
            </div>
          ))}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() =>
                appendBatch({
                  batchId: `batch_${batchFields.length + 1}`,
                  name: "",
                  startDate: "",
                })
              }
              className={`${isDarkMode ? "text-white" : "text-black"} font-bold
            `}
            >
              Add Batch
            </button>
            <button
              type="button"
              className="flex items-center gap-1 text-blue-500"
            >
              <AiOutlineArrowLeft /> Click here
            </button>
          </div>

          {/* Submit */}
          <div className="mt-4">
            <button
              type="submit"
              className={`w-full py-3 rounded font-semibold shadow-md ${btnTheme}`}
            >
              Update Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
