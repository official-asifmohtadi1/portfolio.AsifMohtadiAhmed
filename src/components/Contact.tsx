"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

// Form Validation Schema
const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    subject: z.string().min(5, "Subject is required."),
    details: z.string().min(20, "Please provide more details about your project."),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
    const { t } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setErrorMsg("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to send message");
            }

            console.log("Form Submitted Successfully");
            setIsSuccess(true);
            reset();

            // Reset success state after 5 seconds
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (error: any) {
            setErrorMsg(error.message || "Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-slate-900/50">
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto glass p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-emerald-500/10 border-slate-700/50">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
                            {t("contactTitle").split(" ").slice(0, -2).join(" ")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">{t("contactTitle").split(" ").slice(-2).join(" ")}</span>
                        </h2>
                        <p className="text-slate-400">
                            Fill out the form below to discuss your project, and I&apos;ll get back to you with an auto-responder confirmation.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Name Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="name">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register("name")}
                                    className={`w-full px-4 py-3 rounded-xl bg-slate-950/50 border transition-colors focus:ring-2 focus:ring-emerald-500/50 focus:outline-none ${errors.name ? "border-red-500" : "border-slate-800 focus:border-emerald-500"
                                        }`}
                                    placeholder="John Doe"
                                />
                                {errors.name && (
                                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                                        <AlertCircle size={12} /> {errors.name.message}
                                    </p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="email">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    {...register("email")}
                                    className={`w-full px-4 py-3 rounded-xl bg-slate-950/50 border transition-colors focus:ring-2 focus:ring-emerald-500/50 focus:outline-none ${errors.email ? "border-red-500" : "border-slate-800 focus:border-emerald-500"
                                        }`}
                                    placeholder="john@example.com"
                                />
                                {errors.email && (
                                    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                                        <AlertCircle size={12} /> {errors.email.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Subject Field */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="subject">
                                Subject
                            </label>
                            <input
                                id="subject"
                                type="text"
                                {...register("subject")}
                                className={`w-full px-4 py-3 rounded-xl bg-slate-950/50 border transition-colors focus:ring-2 focus:ring-emerald-500/50 focus:outline-none ${errors.subject ? "border-red-500" : "border-slate-800 focus:border-emerald-500"
                                    }`}
                                placeholder="Project Inquiry"
                            />
                            {errors.subject && (
                                <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                                    <AlertCircle size={12} /> {errors.subject.message}
                                </p>
                            )}
                        </div>

                        {/* Details Field */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="details">
                                Project Details
                            </label>
                            <textarea
                                id="details"
                                {...register("details")}
                                rows={5}
                                className={`w-full px-4 py-3 rounded-xl bg-slate-950/50 border transition-colors focus:ring-2 focus:ring-emerald-500/50 focus:outline-none resize-none ${errors.details ? "border-red-500" : "border-slate-800 focus:border-emerald-500"
                                    }`}
                                placeholder="Tell me about your tech stack, goals, and timeline..."
                            />
                            {errors.details && (
                                <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                                    <AlertCircle size={12} /> {errors.details.message}
                                </p>
                            )}
                        </div>

                        {/* Status Messages */}
                        {isSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center gap-3"
                            >
                                <CheckCircle2 />
                                <p className="font-medium text-sm">Message sent successfully! An auto-responder confirmation is on its way.</p>
                            </motion.div>
                        )}

                        {errorMsg && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400 flex items-center gap-3"
                            >
                                <AlertCircle />
                                <p className="font-medium text-sm">{errorMsg}</p>
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full md:w-auto px-8 py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed
              bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-slate-950 mt-4 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]"
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                            ) : (
                                <>
                                    Send Message <Send size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
