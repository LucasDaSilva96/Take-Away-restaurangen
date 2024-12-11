'use client';
import { IoMdCloseCircle } from 'react-icons/io';
import { useRef, useState } from 'react';
import { createMenu } from '@/util/menu';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CreateMenuItemPage() {
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleImageDelete = () => {
    setImageFile(undefined);
    setImagePreview(undefined);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
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
    formData.append('title', titleRef.current.value);
    formData.append('price', priceRef.current.value);
    formData.append('description', descriptionRef.current.value);
    formData.append('category', categoryRef.current.value);
    formData.append('ingredients', ingredientsRef.current.value);
    formData.append('inventory', inventoryRef.current.value);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    formData.append('onSale', String(isOnSale));

    try {
      setIsCreating(true);
      await createMenu(formData);
      router.refresh();
      if (formRef.current) {
        formRef.current.reset();
      }
      setImagePreview(undefined);
      setImageFile(undefined);
      toast.success('Menu item created successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create menu item');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <section className='w-full h-full flex flex-col items-center'>
      <h1 className='text-2xl text-main-primary font-mono uppercase'>
        Create Menu Item
      </h1>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className='w-full max-w-md flex flex-col gap-1 text-black'
      >
        <label htmlFor='title'>Title*</label>
        <input
          className='p-1 rounded-md text-black'
          type='text'
          id='title'
          name='title'
          required
          ref={titleRef}
        />

        <label htmlFor='price'>Price*</label>
        <input
          className='p-1 rounded-md text-black'
          type='number'
          id='price'
          name='price'
          required
          min={1}
          ref={priceRef}
        />

        <label htmlFor='description'>Description*</label>
        <textarea
          id='description'
          name='description'
          required
          ref={descriptionRef}
        />

        <label htmlFor='category'>Category*</label>
        <input
          className='p-1 rounded-md text-black'
          type='text'
          id='category'
          name='category'
          required
          ref={categoryRef}
        />

        <label htmlFor='ingredients'>Ingredients*</label>
        <input
          className='p-1 rounded-md text-black'
          type='text'
          id='ingredients'
          name='ingredients'
          required
          ref={ingredientsRef}
        />

        <div className='flex items-center flex-col md:flex-row w-full'>
          <label htmlFor='image'>Image</label>
          <input
            ref={imageInputRef}
            className='p-1 rounded-md text-black'
            type='file'
            id='image'
            name='image'
            accept='image/*'
            onChange={handleImageChange}
          />
          {imagePreview ? (
            <div className='relative min-w-24'>
              <IoMdCloseCircle
                className='text-main-secondary cursor-pointer absolute top-0 right-0 z-10 backdrop-blur-sm drop-shadow-md rounded-full'
                size={28}
                onClick={handleImageDelete}
              />
              <img
                src={imagePreview}
                alt='Image Preview'
                className='w-24 h-24 rounded-md'
              />
            </div>
          ) : (
            <div className='w-24 h-24 rounded-md bg-transparent'></div>
          )}
        </div>

        <label htmlFor='inventory'>Inventory*</label>
        <input
          className='p-1 rounded-md text-black'
          type='number'
          id='inventory'
          name='inventory'
          min={1}
          required
          ref={inventoryRef}
        />

        <div className='flex items-center gap-1'>
          <label htmlFor='onSale'>On Sale</label>
          <input
            onChange={() => setIsOnSale((e) => !e)}
            type='checkbox'
            id='onSale'
            name='onSale'
          />
        </div>

        <button
          type='submit'
          disabled={isCreating}
          className='bg-main-secondary text-main-primary font-mono p-2 rounded-md font-bold'
        >
          {isCreating ? 'Creating...' : 'Create'}
        </button>
      </form>
    </section>
  );
}
