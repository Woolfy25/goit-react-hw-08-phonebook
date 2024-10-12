import { createAsyncThunk } from "@reduxjs/toolkit";
import { contactsApi } from "../api/apiContacts";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, thunkApi) => {
    try {
      const response = await contactsApi.getAll();
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkApi) => {
    try {
      const response = await contactsApi.create(contact);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkApi) => {
    try {
      await contactsApi.delete(contactId);
      return { id: contactId };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
