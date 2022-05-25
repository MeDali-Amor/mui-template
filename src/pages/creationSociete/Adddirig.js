import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import InputFeild from "../../components/InputFeild";
import { Grid } from "@mui/material";

// Here is an example of a form with an editable list.
// Next to each input are buttons for insert and remove.
// If the list is empty, there is a button to add an item.
export const Adddirig = () => (
    <div>
        <h1>Friend List</h1>
        <Formik
            initialValues={{ friends: [] }}
            onSubmit={(values) => console.log(values)}
            render={({ values }) => (
                <Form>
                    <FieldArray
                        name="friends"
                        render={(arrayHelpers) => (
                            <div>
                                {values.friends && values.friends.length > 0 ? (
                                    values.friends.map((friend, index) => (
                                        <div key={index}>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    id="name"
                                                    name={`friends.${index}.name`}
                                                    label="name"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    id="age"
                                                    name={`friends.${index}.age`}
                                                    label="age"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <InputFeild
                                                    id="title"
                                                    name={`friends.${index}.title`}
                                                    label="title"
                                                    fullWidth
                                                />
                                            </Grid>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    arrayHelpers.remove(index)
                                                } // remove a friend from the list
                                            >
                                                -
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    arrayHelpers.insert({
                                                        name: "",
                                                        age: "",
                                                        title: "",
                                                    })
                                                } // insert an empty string at a position
                                            >
                                                +
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => arrayHelpers.push("")}
                                    >
                                        {/* show this when user has removed all friends from the list */}
                                        Add a friend
                                    </button>
                                )}
                                <div>
                                    <button type="submit">Submit</button>
                                </div>
                            </div>
                        )}
                    />
                </Form>
            )}
        />
    </div>
);
