import { describe, it, expect } from "vitest";
import nodemailer from "nodemailer";

describe("Gmail SMTP configuration", () => {
  it("should have GMAIL_USER set", () => {
    const user = process.env.GMAIL_USER;
    expect(user).toBeTruthy();
    expect(user).toContain("@");
  });

  it("should have GMAIL_APP_PASSWORD set", () => {
    const pass = process.env.GMAIL_APP_PASSWORD;
    expect(pass).toBeTruthy();
    expect(pass!.length).toBeGreaterThan(0);
  });

  it("should create a nodemailer transporter without errors", () => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER ?? "test@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD ?? "testpass",
      },
    });
    expect(transporter).toBeDefined();
  });
});
