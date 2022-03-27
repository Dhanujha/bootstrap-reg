import React from "react";
import Card from "./components/Card";
import Container from "./components/Container";
import Heading from "./components/Heading";
import TextArea from "./components/TextArea";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Input from "./components/Input";
import { toTitleCase } from "./utils/string";

interface InputState {
  name: string;
  email: string;
  message?: string;
  country?: string;
  state?: string;
  city?: string;
  mobile?: string;
}

type ValidateOutput = {
  value: boolean;
  message?: string;
};

const TEXT_TYPE_FIELDS: (keyof InputState)[] = [
  "name",
  "email",
  "mobile",
  "city",
  "state",
  "country",
];

const DEFAULT_INPUT_STATE: InputState = {
  city: "",
  country: "",
  email: "",
  message: "",
  mobile: "",
  name: "",
  state: "",
};

function App() {
  const [input, setInput] = React.useState<InputState>(DEFAULT_INPUT_STATE);
  const [isTouched, setIsTouched] = React.useState(false);

  function handleChange(field: keyof InputState, value: string) {
    setInput({
      ...input,
      [field]: value || "",
    });
  }

  function reset() {
    setIsTouched(false);
    setInput(DEFAULT_INPUT_STATE);
  }

  function validate(field: keyof InputState): ValidateOutput {
    if (!isTouched) return { value: true, message: "" };
    switch (field) {
      case "email":
        return validateEmail();
      case "mobile":
        return validateMobile();
      case "name":
        return validateName();
      default:
        return {
          value: true,
          message: "",
        };
    }
  }

  function validateEmail(): ValidateOutput {
    if (!input.email) {
      return { value: false, message: "Email is required" };
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(input.email)) {
      return { value: false, message: "Email is not valid" };
    }
    return { value: true, message: "" };
  }

  function validateName(): ValidateOutput {
    if (!input.name) {
      return { value: false, message: "Name is required" };
    }
    return { value: true, message: "" };
  }

  function validateMobile(): ValidateOutput {
    if (input?.mobile && !/^\+\d{1,3} \d{9,10}$/.test(input.mobile)) {
      return {
        value: false,
        message:
          "Should contain 9 - 10 digit number, prefixed by + and country code upto 4 digit. Eg, +91 1234567890",
      };
    }
    return { value: true, message: "" };
  }

  function validateAll(): boolean {
    return (
      validateEmail().value && validateMobile().value && validateName().value
    );
  }

  return (
    <>
      <Container>
        <Card>
          <Heading heading="Registration Info" />

          <form
            className=""
            onSubmit={(event) => {
              event.preventDefault();

              setIsTouched(true);
              if (validateAll()) {
                alert("Submitted");
                reset();
              }
            }}
          >
            {TEXT_TYPE_FIELDS.map((field) => {
              return (
                <Input
                  type={field === "email" ? "email" : "text"}
                  label={toTitleCase(field)}
                  id={field}
                  key={field}
                  error={!validate(field).value}
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

            <button type="submit" className="btn btn-success btn-lg mb-1">
              Submit
            </button>
          </form>
        </Card>
      </Container>
    </>
  );
}

export default App;
