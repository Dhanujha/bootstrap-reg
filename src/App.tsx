import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Heading from "./components/Heading";
import Card from "./components/Card";
import Container from "./components/Container";
import Input from "./components/Input";
import { toTitleCase } from "./utils/string";
import TextArea from "./components/TextArea";

interface InputState {
  name: string;
  email: string;
  message?: string;
  country?: string;
  state?: string;
  city?: string;
  mobile?: string;
}

const TEXT_TYPE_FIELDS: (keyof InputState)[] = [
  "name",
  "email",
  "mobile",
  "city",
  "state",
  "country",
];

interface ValidationValueOptions {
  value: boolean | RegExp;
  message: string;
}
interface ValidationOptions {
  required?: ValidationValueOptions;
  pattern?: ValidationValueOptions;
}

const validationSchema: Partial<Record<keyof InputState, ValidationOptions>> = {
  email: {
    pattern: {
      message: "Please enter a valid email",
      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    required: {
      message: "Email is required",
      value: true,
    },
  },
  name: {
    required: {
      message: "Name is Required",
      value: true,
    },
  },
  mobile: {
    pattern: {
      value: /^\+\d{1,3} \d{9,10}$/,
      message:
        "Should contain 9 - 10 digit number, prefixed by + and country code upto 4 digit. Eg, +91 1234567890",
    },
  },
};

type ValidateOutput = {
  value: boolean;
  message?: string;
};

function App() {
  const [input, setInput] = useState<InputState>({
    name: "",
    email: "",
  });

  const [isTouched, setIsTouched] = useState(false);

  function validate(field: keyof InputState): ValidateOutput {
    if (isTouched) {
      const fieldSchema = validationSchema[field];
      const currentValue = input[field];
      if (fieldSchema?.required?.value && !currentValue) {
        return { message: fieldSchema?.required?.message, value: true };
      }
      if (
        fieldSchema?.pattern?.value &&
        currentValue &&
        !(fieldSchema?.pattern?.value as RegExp).test(currentValue)
      ) {
        return { message: fieldSchema?.pattern?.message, value: true };
      }
    }
    return {
      value: false,
    };
  }

  function handleChange(field: keyof InputState, value: string) {
    setInput({
      ...input,
      [field]: value || "",
    });
  }

  return (
    <Container>
      <Card>
        <Heading heading="Registration Info" />

        <form
          className="px-md-2"
          onClick={(event) => {
            event.preventDefault();
          }}
        >
          {TEXT_TYPE_FIELDS.map((field) => {
            return (
              <Input
                type={field === "email" ? "email" : "text"}
                label={toTitleCase(field)}
                id={field}
                key={field}
                error={validate(field).value}
                errorMessage={validate(field)?.message}
                value={input?.[field]}
                onChange={(event) => {
                  handleChange(field, event.target.value);
                }}
              />
            );
          })}

          <TextArea
            id="message"
            label="Message"
            onChange={(event) => {
              handleChange("message", event.target.value);
            }}
            value={input?.message}
          />

          <button
            type="submit"
            className="btn btn-success btn-lg mb-1"
            onClick={() => {
              setIsTouched(true);
            }}
          >
            Submit
          </button>
        </form>
      </Card>
    </Container>
  );
}

export default App;
