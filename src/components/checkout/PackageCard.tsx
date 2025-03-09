import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import StripeCheckoutButton from './StripeCheckoutButton';
import { Button } from '../ui/button';
import { Languages } from "@/constants/enums";
import { getRamadanPackage } from '@/actions/package-actions';
// import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { headers } from 'next/headers';
import { Locale } from '@/i18n.config';
import getTrans from '@/utils/translation';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

interface PackageCardProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency?: string;
  features: string[];
  className?: string;
  isFree?: boolean;
}

export default async function PackageCard({
  id,
  name,
  description,
  price,
  currency = 'AED',
  features,
  className = '',
  isFree = false
}: PackageCardProps) {
  const url = (await headers()).get('x-url')
  const locale = url?.split('/')[3] as Locale
  const t = await getTrans(locale);
  
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  // Convert currency to Arabic if needed
  const displayCurrency = locale === Languages.ARABIC ? 'د.إ' : currency;
  // Generate the redirect URLs for authentication
  const signupUrl = `/${locale}/auth/signup`;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function claimPackageAction(formData: FormData) {
    'use server';
    
    const result = await getRamadanPackage();
    if (!result.success) {
      // Handle error without returning
      console.error(result.message);
      return;
    }
    
    redirect(`/${locale}/profile/packages`);
  }

  return (
    <Card className={`bg-background/60 ${className}`}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-4">
          {price > 0 ? price.toFixed(2) : t.payments.free} <span className="text-sm">{isFree? "" : displayCurrency}</span>
        </div>
         
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {!session ? (
          <Link href={signupUrl} className="w-full">
            <Button className="w-full">
              {t.payments.getStarted}
            </Button>
          </Link>
        ) : isFree ? (
          <form action={claimPackageAction} className='w-full'>
            <Button type="submit" className="w-full">
              {t.payments.getStarted}
            </Button>
          </form>
        ) : (
          <StripeCheckoutButton
            packageId={id}
            className="w-full"
            buttonText={t.payments.selectPackage}
          />
        )}
      </CardFooter>
    </Card>
  );
}