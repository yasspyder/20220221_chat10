import { useState } from "react";
import { firebaseApp } from "../api/firebase";

const onSubmit = (email, password) => {
  return firebaseApp.auth().createUserWithEmailAndPassword(email, password);
};

export function SignUpPage() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChangeForm = (e) => {
    const field = e.target.getAttribute("data-name");

    setForm({
      ...form,
      [field]: e.target.value,
    });
  };

  return (
    <div>
      <h1>SignUpPage</h1>

      <input
        placeholder="email"
        onChange={handleChangeForm}
        data-name="email"
        value={form.email}
      />
      <input
        placeholder="password"
        onChange={handleChangeForm}
        data-name="password"
        value={form.password}
      />
      <button
        onClick={() => {
          onSubmit(form.email, form.password);
        }}
      >
        SignUp
      </button>
    </div>
  );
}
