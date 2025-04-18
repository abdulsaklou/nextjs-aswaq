'use client'
import React, { FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { changeEmail } from '@/actions/auth-actions';
import AuthCard from '@/components/auth/AuthCard';
import { toast } from '@/hooks/use-toast';
import EmailConfirmation from "@/components/auth/EmailConfirmation";
import { useTranslation } from '@/hooks/use-translation';

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;

function ChangeEmailForm() {
  const { t, getLocalizedPath } = useTranslation();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<EmailFormData>({
    email: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof EmailFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof EmailFormData, boolean>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateField = (field: keyof EmailFormData, value: string) => {
    try {
      const partialData = { [field]: value } as EmailFormData;
      emailSchema.parse(partialData);
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldError = err.errors.find(error => 
          error.path[0] === field
        );
        if (fieldError) {
          setErrors(prev => ({
            ...prev,
            [field]: fieldError.message
          }));
        }
      }
    }
  };

  const handleChange = (field: keyof EmailFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: keyof EmailFormData) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateForm = () => {
    try {
      emailSchema.parse(formData);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors = err.errors.reduce((acc, error) => {
          const field = error.path[0] as keyof EmailFormData || 'email';
          acc[field] = error.message;
          return acc;
        }, {} as Record<keyof EmailFormData, string>);
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ email: true });

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await changeEmail({ email: formData.email });
      const { error } = JSON.parse(response);

      if (error) {
        console.log(error);
        toast({
          title: t.common.error,
          description: t.auth.emailChangeError,
          variant: "destructive",
        });
      } else {
        console.log(response);
        toast({
          title: t.common.success,
          description: t.auth.emailChangeSuccess,
        });
        setIsComplete(true);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: t.common.error,
        description: t.common.somethingWentWrong,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleBackToLogin = () => {
    router.push(getLocalizedPath("/auth/login"));
  };
  if (!mounted) {
    return null;
  }
  if (isComplete) {
    return (
      <AuthCard title={t.auth.resendVerificationEmail}>
        <EmailConfirmation 
          email={formData.email}
          type='email_change'
          onBackToLogin={handleBackToLogin} 
        />
      </AuthCard>
    );
  }
  return (
    <AuthCard title={t.auth.changeEmailAddress}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">{t.auth.newEmail}</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            autoComplete="new-password"
            placeholder={t.auth.enterNewEmail}
            required
            disabled={isLoading}
            className={errors.email ? "border-red-500 h-10" : "h-10"}
            aria-invalid={!!errors.email}
          />
          {touched.email && errors.email && (
            <Alert variant="destructive" className="py-2 border-none">
              <AlertDescription>{errors.email}</AlertDescription>
            </Alert>
          )}
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t.auth.changingEmail}
            </>
          ) : (
            t.auth.changeEmail
          )}
        </Button>
      </form>
    </AuthCard>
  );
}

export default ChangeEmailForm;