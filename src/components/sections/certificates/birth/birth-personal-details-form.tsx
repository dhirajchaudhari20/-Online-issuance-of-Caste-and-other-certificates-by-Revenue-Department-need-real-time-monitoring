"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { BirthDetailsSchema } from "@/schemas";

import { useBirthFormState } from "@/context/birth-form-context";

import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/select";

const BirthPersonalDetailsForm = () => {
  const { onHandleNext, setFormData, formData } = useBirthFormState();
  const [selectGender, setSelectGender] = useState(formData.gender);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof BirthDetailsSchema>>({
    resolver: zodResolver(BirthDetailsSchema),
    defaultValues: formData,
  });

  const onHandleFormSubmit = (data: z.infer<typeof BirthDetailsSchema>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    onHandleNext();
  };

  return (
    <form
      className="flex gap-3 flex-col"
      onSubmit={handleSubmit(onHandleFormSubmit)}
    >
      <h1 className="text-lg font-medium mb-3 border-b-2 border-border w-fit">
        Personal Details
      </h1>

      <div className="flex max-md:flex-col gap-4">
        {/* User Inputs -- First Name */}
        <Input
          label="First Name"
          name="firstName"
          type="text"
          placeholder="First name"
          error={errors.firstName?.message}
          register={register("firstName")}
        />

        {/* User Inputs -- Middle Name */}
        <Input
          label="Middle Name (Optional)"
          name="middleName"
          type="text"
          placeholder="Middle name"
          error={errors.middleName?.message}
          register={register("middleName")}
        />

        {/* User Inputs -- Last Name */}
        <Input
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Last name"
          error={errors.lastName?.message}
          register={register("lastName")}
        />
      </div>

      <div className="flex max-md:flex-col gap-4">
        {/* User Inputs -- Place of Birth (Country) */}
        <Input
          label="Place of Birth (Country)"
          name="placeOfBirthCountry"
          type="text"
          placeholder="Country"
          error={errors.placeOfBirthCountry?.message}
          register={register("placeOfBirthCountry")}
        />

        {/* User Inputs -- Place of Birth (Province) */}
        <Input
          label="Place of Birth (Province)"
          name="placeOfBirthProvince"
          type="text"
          placeholder="Province"
          error={errors.placeOfBirthProvince?.message}
          register={register("placeOfBirthProvince")}
        />

        {/* User Inputs -- Place of Birth (District) */}
        <Input
          label="Place of Birth (District)"
          name="placeOfBirthDistrict"
          type="text"
          placeholder="District"
          error={errors.placeOfBirthDistrict?.message}
          register={register("placeOfBirthDistrict")}
        />

        {/* User Inputs -- Place of Birth (City) */}
        <Input
          label="Place of Birth (City)"
          name="placeOfBirthCity"
          type="text"
          placeholder="City"
          error={errors.placeOfBirthCity?.message}
          register={register("placeOfBirthCity")}
        />
      </div>

      <div className="flex max-md:flex-col gap-4">
        {/* User Inputs -- Date of Birth */}
        <Input
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          placeholder="Date of Birth"
          error={errors.dateOfBirth?.message}
          register={register("dateOfBirth")}
        />

        {/* User Inputs -- Gender */}
        <Select
          selectLabel="Gender"
          name="gender"
          value={selectGender}
          setSelectValue={setSelectGender}
          error={errors.gender?.message}
          register={register("gender")}
          options={[
            { label: "Male", value: "MALE" },
            { label: "Female", value: "FEMALE" },
            { label: "Others", value: "OTHERS" },
          ]}
        />
      </div>

      <div className="flex max-md:flex-col gap-4">
        {/* User Inputs -- Father's FirstName */}
        <Input
          label="Father's FirstName"
          name="fatherFirstName"
          type="text"
          placeholder="Father's FirstName"
          error={errors.fatherFirstName?.message}
          register={register("fatherFirstName")}
        />

        {/* User Inputs -- Father's MiddleName */}
        <Input
          label="Father's MiddleName (Optional)"
          name="fatherMiddleName"
          type="text"
          placeholder="Father's MiddleName"
          error={errors.fatherMiddleName?.message}
          register={register("fatherMiddleName")}
        />

        {/* User Inputs -- Father's LastName */}
        <Input
          label="Father's LastName"
          name="fatherLastName"
          type="text"
          placeholder="Father's LastName"
          error={errors.fatherLastName?.message}
          register={register("fatherLastName")}
        />
      </div>

      <div className="flex max-md:flex-col gap-4">
        {/* User Inputs -- Mother's FirstName */}
        <Input
          label="Mother's FirstName"
          name="motherFirstName"
          type="text"
          placeholder="Mother's FirstName"
          error={errors.motherFirstName?.message}
          register={register("motherFirstName")}
        />

        {/* User Inputs -- Mother's MiddleName */}
        <Input
          label="Mother's MiddleName (Optional)"
          name="motherMiddleName"
          type="text"
          placeholder="Mother's MiddleName"
          error={errors.motherMiddleName?.message}
          register={register("motherMiddleName")}
        />

        {/* User Inputs -- Mother's LastName */}
        <Input
          label="Mother's LastName"
          name="motherLastName"
          type="text"
          placeholder="Mother's LastName"
          error={errors.motherLastName?.message}
          register={register("motherLastName")}
        />
      </div>

      <div className="flex gap-4 justify-end mt-4">
        <Button className="w-28">Next</Button>
      </div>
    </form>
  );
};

export default BirthPersonalDetailsForm;
