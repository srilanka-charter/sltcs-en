import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import nodemailer from "nodemailer";

// ─── Email helper ─────────────────────────────────────────────────────────────
async function sendEnquiryEmail(data: {
  name: string;
  country: string;
  countryOther?: string;
  email: string;
  phone?: string;
  startDate: string;
  endDate: string;
  pickup: string;
  adults: string;
  children: string;
  vehicle: string;
  currency?: string;
  notes?: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER ?? "srilanka.41032@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD ?? "",
    },
  });

  const countryDisplay = data.country === "Other" && data.countryOther
    ? `Other — ${data.countryOther}`
    : data.country;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 24px; border-radius: 8px;">
      <div style="background: #1a1a1a; color: #c9a84c; padding: 16px 24px; border-radius: 6px 6px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 1.4rem; letter-spacing: 0.05em;">SLTCS — New Enquiry Received</h1>
        <p style="margin: 4px 0 0; color: #aaa; font-size: 0.85rem;">Sri Lanka Car Hire with Private Driver</p>
      </div>
      <div style="background: #fff; padding: 24px; border-radius: 0 0 6px 6px; border: 1px solid #e0e0e0; border-top: none;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold; width: 40%; border-bottom: 1px solid #eee;">Full Name</td><td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${data.name}</td></tr>
          <tr><td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold; border-bottom: 1px solid #eee;">Country</td><td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${countryDisplay}</td></tr>
          <tr><td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold; border-bottom: 1px solid #eee;">Email</td><td style="padding: 8px 12px; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td><td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${data.phone || "—"}</td></tr>
          <tr><td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold; border-bottom: 1px solid #eee;">Start Date</td><td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${data.startDate}</td></tr>
          <tr><td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold; border-bottom: 1px solid #eee;">End Date</td><td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${data.endDate}</td></tr>
          <tr><td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold; border-bottom: 1px solid #eee;">Charter Start Location</td><td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${data.pickup}</td></tr>
          <tr><td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold; border-bottom: 1px solid #eee;">Adults</td><td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${data.adults}</td></tr>
          <tr><td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold; border-bottom: 1px solid #eee;">Children</td><td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${data.children}</td></tr>
          <tr><td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold; border-bottom: 1px solid #eee;">Vehicle Type</td><td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${data.vehicle}</td></tr>
          <tr><td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold; border-bottom: 1px solid #eee;">Preferred Currency</td><td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${data.currency || "—"}</td></tr>
          <tr><td style="padding: 8px 12px; background: #f5f5f5; font-weight: bold;">Notes / Itinerary</td><td style="padding: 8px 12px;">${data.notes || "—"}</td></tr>
        </table>
        <div style="margin-top: 20px; padding: 12px 16px; background: #fff8e6; border-left: 4px solid #c9a84c; border-radius: 4px;">
          <strong>Action required:</strong> Please reply to the customer at <a href="mailto:${data.email}">${data.email}</a> within 24 hours.
        </div>
      </div>
      <p style="text-align: center; color: #aaa; font-size: 0.78rem; margin-top: 16px;">SLTCS｜Sri Lanka Car Hire with Private Driver</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"SLTCS Enquiry System" <${process.env.GMAIL_USER ?? "srilanka.41032@gmail.com"}>`,
    to: "srilanka.41032@gmail.com",
    subject: `[SLTCS] New Enquiry from ${data.name} (${countryDisplay})`,
    html,
  });
}

// ─── Enquiry input schema ─────────────────────────────────────────────────────
const enquirySchema = z.object({
  name: z.string().min(1),
  country: z.string().min(1),
  countryOther: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  pickup: z.string().min(1),
  adults: z.string().min(1),
  children: z.string(),
  vehicle: z.string().min(1),
  currency: z.string().optional(),
  notes: z.string().optional(),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── Enquiry submission ───────────────────────────────────────────────────
  enquiry: router({
    submit: publicProcedure
      .input(enquirySchema)
      .mutation(async ({ input }) => {
        const countryDisplay = input.country === "Other" && input.countryOther
          ? `Other — ${input.countryOther}`
          : input.country;

        // 1. Send email via Gmail SMTP
        try {
          await sendEnquiryEmail(input);
          console.log("[Enquiry] Email sent successfully to srilanka.41032@gmail.com");
        } catch (err) {
          console.error("[Enquiry] Failed to send email:", err);
          // Don't block the response — still notify owner via Manus
        }

        // 2. Notify owner via Manus notification system (fallback)
        const notifContent = [
          `Name: ${input.name}`,
          `Country: ${countryDisplay}`,
          `Email: ${input.email}`,
          `Phone: ${input.phone || "—"}`,
          `Start Date: ${input.startDate}`,
          `End Date: ${input.endDate}`,
          `Pickup: ${input.pickup}`,
          `Adults: ${input.adults} / Children: ${input.children}`,
          `Vehicle: ${input.vehicle}`,
          `Currency: ${input.currency || "—"}`,
          `Notes: ${input.notes || "—"}`,
        ].join("\n");

        await notifyOwner({
          title: `New Enquiry from ${input.name} (${countryDisplay})`,
          content: notifContent,
        }).catch(e => console.warn("[Enquiry] Manus notification failed:", e));

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
