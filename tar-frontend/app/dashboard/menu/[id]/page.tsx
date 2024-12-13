"use client";
import { useParams, useRouter } from "next/navigation";
import { IoMdCloseCircle } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import { getMenuById, updateMenu } from "@/util/menu";
import toast from "react-hot-toast";
import Image from "next/image";

export default function MenuItemPage() {
  const { id } = useParams<{ id: string }>();
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const [hasImageUpdated, setHasImageUpdated] = useState(false);
  const [isOnSale, setIsOnSale] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const ingredientsRef = useRef<HTMLInputElement>(null);
  const inventoryRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const data = await getMenuById(id);
        console.log(data);
        if (data) {
          if (
            formRef.current &&
            titleRef.current &&
            priceRef.current &&
            descriptionRef.current &&
            categoryRef.current &&
            ingredientsRef.current &&
            inventoryRef.current
          ) {
            titleRef.current.value = data.title;
            priceRef.current.value = data.price.toString();
            descriptionRef.current.value = data.description;
            categoryRef.current.value = data.category;
            ingredientsRef.current.value = data.ingredients.join(",");
            inventoryRef.current.value = data.inventory.toString();
            setImagePreview(data.image);
            setIsOnSale(data.onSale);
          }
        } else {
          console.error(data);

          toast.error("Failed to fetch menu item");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch menu item");
      }
    };

    fetchMenuItem();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setHasImageUpdated(true);
      setImageFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setHasImageUpdated(false);
    }
  };

  const handleImageDelete = () => {
    setImageFile(undefined);
    setImagePreview(undefined);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formRef.current ||
      !titleRef.current ||
      !priceRef.current ||
      !descriptionRef.current ||
      !categoryRef.current ||
      !ingredientsRef.current ||
      !inventoryRef.current
    )
      return;

    const formData = new FormData();
    formData.append("title", titleRef.current.value);
    formData.append("price", priceRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("category", categoryRef.current.value);
    formData.append("ingredients", ingredientsRef.current.value);
    formData.append("inventory", inventoryRef.current.value);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    formData.append("onSale", String(isOnSale));

    try {
      setIsCreating(true);
      await updateMenu({ formData, id, hasImagedUpdated: hasImageUpdated });
      router.refresh();

      toast.success("Menu item updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update menu item");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <section className="w-full h-full flex flex-col items-center">
      <h1 className="text-2xl text-main-primary font-mono uppercase">
        Update menu item
      </h1>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-1 text-black"
      >
        <label htmlFor="title">Title*</label>
        <input
          className="p-1 rounded-md text-black"
          type="text"
          id="title"
          name="title"
          required
          ref={titleRef}
        />

        <label htmlFor="price">Price*</label>
        <input
          className="p-1 rounded-md text-black"
          type="number"
          id="price"
          name="price"
          ref={priceRef}
          step={0.01}
        />

        <label htmlFor="description">Description*</label>
        <textarea
          id="description"
          name="description"
          required
          ref={descriptionRef}
        />

        <label htmlFor="category">Category*</label>
        <input
          className="p-1 rounded-md text-black"
          type="text"
          id="category"
          name="category"
          required
          ref={categoryRef}
        />

        <label htmlFor="ingredients">Ingredients*</label>
        <input
          className="p-1 rounded-md text-black"
          type="text"
          id="ingredients"
          name="ingredients"
          required
          ref={ingredientsRef}
        />

        <div className="flex items-center flex-col md:flex-row w-full">
          <label htmlFor="image">Image</label>
          <input
            ref={imageInputRef}
            className="p-1 rounded-md text-black"
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview ? (
            <div className="relative min-w-24">
              <IoMdCloseCircle
                className="text-main-secondary cursor-pointer absolute top-0 right-0 z-10 backdrop-blur-sm drop-shadow-md rounded-full"
                size={28}
                onClick={handleImageDelete}
              />
              <Image
                src={imagePreview}
                alt="Image Preview"
                className="w-24 h-24 rounded-md"
                width={96}
                height={96}
              />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-md bg-transparent"></div>
          )}
        </div>

        <label htmlFor="inventory">Inventory*</label>
        <input
          className="p-1 rounded-md text-black"
          type="number"
          id="inventory"
          name="inventory"
          min={1}
          required
          ref={inventoryRef}
        />

        <div className="flex items-center gap-1">
          <label htmlFor="onSale">On Sale</label>
          <input
            onChange={() => setIsOnSale((e) => !e)}
            type="checkbox"
            id="onSale"
            name="onSale"
            value={String(isOnSale)}
            checked={isOnSale}
          />
        </div>

        <button
          type="submit"
          disabled={isCreating}
          className="bg-main-secondary text-main-primary font-mono p-2 rounded-md font-bold"
        >
          {isCreating ? "Updating..." : "Update"}
        </button>
      </form>
    </section>
  );
}
