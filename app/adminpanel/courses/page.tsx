"use client";
// components/AddCourseForm.tsx
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";

const AddCourseForm: React.FC = () => {
  const router = useRouter();
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        // Redirect to the course list page or any other page as needed
        router.push("/courses");
      } else {
        console.error("Failed to add course");
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-field">
        <label htmlFor="title">Title</label>
        <InputText
          id="title"
          name="title"
          value={courseData.title}
          onChange={handleChange}
        />
      </div>
      <div className="p-field">
        <label htmlFor="description">Description</label>
        <InputText
          id="description"
          name="description"
          value={courseData.description}
          onChange={handleChange}
        />
      </div>
      <div className="p-field">
        <label htmlFor="price">Price</label>
        <InputText
          id="price"
          name="price"
          value={courseData.price}
          onChange={handleChange}
        />
      </div>
      <div className="p-field">
        <label htmlFor="thumbnail">Thumbnail URL</label>
        <InputText
          id="thumbnail"
          name="thumbnail"
          value={courseData.thumbnail}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" label="Add Course" className="p-mt-2" />
    </form>
  );
};

export default AddCourseForm;
