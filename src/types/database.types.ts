export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      business_profiles: {
        Row: {
          business_category: string
          business_name: string
          company_address: string
          company_email: string
          company_logo: string | null
          company_phone: string
          created_at: string
          id: string
          tax_registration_number: string | null
          trade_license_expiry: string
          trade_license_number: string
          trade_license_verified: boolean | null
          updated_at: string
        }
        Insert: {
          business_category: string
          business_name: string
          company_address: string
          company_email: string
          company_logo?: string | null
          company_phone: string
          created_at?: string
          id: string
          tax_registration_number?: string | null
          trade_license_expiry: string
          trade_license_number: string
          trade_license_verified?: boolean | null
          updated_at?: string
        }
        Update: {
          business_category?: string
          business_name?: string
          company_address?: string
          company_email?: string
          company_logo?: string | null
          company_phone?: string
          created_at?: string
          id?: string
          tax_registration_number?: string | null
          trade_license_expiry?: string
          trade_license_number?: string
          trade_license_verified?: boolean | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          display_in_header: boolean
          display_in_hero: boolean
          display_in_home: boolean
          display_order: number
          hero_image: string | null
          icon: string | null
          id: string
          is_active: boolean
          name: string
          parent_id: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_in_header?: boolean
          display_in_hero?: boolean
          display_in_home?: boolean
          display_order?: number
          hero_image?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean
          name: string
          parent_id?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_in_header?: boolean
          display_in_hero?: boolean
          display_in_home?: boolean
          display_order?: number
          hero_image?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean
          name?: string
          parent_id?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          buyer_id: string
          created_at: string
          id: string
          last_message_at: string
          listing_id: string
          seller_id: string
        }
        Insert: {
          buyer_id: string
          created_at?: string
          id?: string
          last_message_at?: string
          listing_id: string
          seller_id: string
        }
        Update: {
          buyer_id?: string
          created_at?: string
          id?: string
          last_message_at?: string
          listing_id?: string
          seller_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          billing_address: Json | null
          created_at: string
          id: string
          payment_method: Json | null
          stripe_customer_id: string | null
        }
        Insert: {
          billing_address?: Json | null
          created_at?: string
          id: string
          payment_method?: Json | null
          stripe_customer_id?: string | null
        }
        Update: {
          billing_address?: Json | null
          created_at?: string
          id?: string
          payment_method?: Json | null
          stripe_customer_id?: string | null
        }
        Relationships: []
      }
      faq_articles: {
        Row: {
          category_id: string | null
          content: string
          created_at: string
          display_order: number
          frontmatter: Json | null
          id: string
          is_published: boolean
          last_updated_by: string | null
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
          version: number
          view_count: number
        }
        Insert: {
          category_id?: string | null
          content: string
          created_at?: string
          display_order?: number
          frontmatter?: Json | null
          id?: string
          is_published?: boolean
          last_updated_by?: string | null
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
          version?: number
          view_count?: number
        }
        Update: {
          category_id?: string | null
          content?: string
          created_at?: string
          display_order?: number
          frontmatter?: Json | null
          id?: string
          is_published?: boolean
          last_updated_by?: string | null
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          version?: number
          view_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "faq_articles_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "faq_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "faq_articles_last_updated_by_fkey"
            columns: ["last_updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      faq_categories: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          id: string
          is_active: boolean
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      likes: {
        Row: {
          created_at: string
          id: string
          listing_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          listing_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          listing_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          category_id: string
          condition: string
          created_at: string
          description: string
          id: string
          images: string[]
          is_active: boolean
          is_featured: boolean
          location: string
          location_id: string | null
          price: number
          slug: string | null
          status: string
          title: string
          updated_at: string
          user_id: string
          views_count: number
        }
        Insert: {
          category_id: string
          condition: string
          created_at?: string
          description: string
          id?: string
          images?: string[]
          is_active?: boolean
          is_featured?: boolean
          location: string
          location_id?: string | null
          price: number
          slug?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
          views_count?: number
        }
        Update: {
          category_id?: string
          condition?: string
          created_at?: string
          description?: string
          id?: string
          images?: string[]
          is_active?: boolean
          is_featured?: boolean
          location?: string
          location_id?: string | null
          price?: number
          slug?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
          views_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "listings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          latitude: number | null
          longitude: number | null
          name: string
          name_ar: string
          parent_id: string | null
          slug: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          latitude?: number | null
          longitude?: number | null
          name: string
          name_ar: string
          parent_id?: string | null
          slug: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          latitude?: number | null
          longitude?: number | null
          name?: string
          name_ar?: string
          parent_id?: string | null
          slug?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "locations_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          attachments: string[] | null
          content: string
          conversation_id: string
          created_at: string
          id: string
          is_system_message: boolean
          read_at: string | null
          sender_id: string
        }
        Insert: {
          attachments?: string[] | null
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          is_system_message?: boolean
          read_at?: string | null
          sender_id: string
        }
        Update: {
          attachments?: string[] | null
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          is_system_message?: boolean
          read_at?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean
          metadata: Json | null
          read_at: string | null
          reference_id: string
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_read?: boolean
          metadata?: Json | null
          read_at?: string | null
          reference_id: string
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean
          metadata?: Json | null
          read_at?: string | null
          reference_id?: string
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      package_listings: {
        Row: {
          activated_at: string | null
          created_at: string
          expires_at: string
          id: string
          is_bonus_listing: boolean
          is_featured: boolean
          listing_id: string
          paused_at: string | null
          remaining_days: number
          total_days: number
          used_days: number | null
          user_package_id: string
        }
        Insert: {
          activated_at?: string | null
          created_at?: string
          expires_at: string
          id?: string
          is_bonus_listing?: boolean
          is_featured?: boolean
          listing_id: string
          paused_at?: string | null
          remaining_days: number
          total_days: number
          used_days?: number | null
          user_package_id: string
        }
        Update: {
          activated_at?: string | null
          created_at?: string
          expires_at?: string
          id?: string
          is_bonus_listing?: boolean
          is_featured?: boolean
          listing_id?: string
          paused_at?: string | null
          remaining_days?: number
          total_days?: number
          used_days?: number | null
          user_package_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "package_listings_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_listings_user_package_id_fkey"
            columns: ["user_package_id"]
            isOneToOne: false
            referencedRelation: "user_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      packages: {
        Row: {
          bonus_listing_count: number | null
          created_at: string
          description: string | null
          duration_days: number
          id: string
          is_active: boolean
          is_featured: boolean
          listing_count: number
          name: string
          stripe_price_id: string
          stripe_product_id: string
          updated_at: string
          user_limit: number | null
          validity_days: number
        }
        Insert: {
          bonus_listing_count?: number | null
          created_at?: string
          description?: string | null
          duration_days: number
          id?: string
          is_active?: boolean
          is_featured?: boolean
          listing_count: number
          name: string
          stripe_price_id: string
          stripe_product_id: string
          updated_at?: string
          user_limit?: number | null
          validity_days: number
        }
        Update: {
          bonus_listing_count?: number | null
          created_at?: string
          description?: string | null
          duration_days?: number
          id?: string
          is_active?: boolean
          is_featured?: boolean
          listing_count?: number
          name?: string
          stripe_price_id?: string
          stripe_product_id?: string
          updated_at?: string
          user_limit?: number | null
          validity_days?: number
        }
        Relationships: [
          {
            foreignKeyName: "packages_stripe_price_id_fkey"
            columns: ["stripe_price_id"]
            isOneToOne: false
            referencedRelation: "stripe_prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "packages_stripe_product_id_fkey"
            columns: ["stripe_product_id"]
            isOneToOne: false
            referencedRelation: "stripe_products"
            referencedColumns: ["id"]
          },
        ]
      }
      pages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_published: boolean
          last_updated_by: string | null
          meta_description: string | null
          meta_keywords: string | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_published?: boolean
          last_updated_by?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_published?: boolean
          last_updated_by?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pages_last_updated_by_fkey"
            columns: ["last_updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          date_of_birth: string | null
          full_name: string
          id: string
          is_banned: boolean | null
          join_date: string
          updated_at: string
          verification_status: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          full_name: string
          id: string
          is_banned?: boolean | null
          join_date?: string
          updated_at?: string
          verification_status?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          full_name?: string
          id?: string
          is_banned?: boolean | null
          join_date?: string
          updated_at?: string
          verification_status?: string | null
        }
        Relationships: []
      }
      property_details: {
        Row: {
          bathrooms: number | null
          bedrooms: number | null
          community: string
          created_at: string
          furnished: boolean
          listing_id: string
          payment_terms: string
          property_type: string
          square_footage: number | null
          updated_at: string
        }
        Insert: {
          bathrooms?: number | null
          bedrooms?: number | null
          community: string
          created_at?: string
          furnished?: boolean
          listing_id: string
          payment_terms: string
          property_type: string
          square_footage?: number | null
          updated_at?: string
        }
        Update: {
          bathrooms?: number | null
          bedrooms?: number | null
          community?: string
          created_at?: string
          furnished?: boolean
          listing_id?: string
          payment_terms?: string
          property_type?: string
          square_footage?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_details_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: true
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          admin_notes: string | null
          created_at: string
          id: string
          listing_id: string | null
          message_id: string | null
          reason: string
          reported_user_id: string | null
          reporter_id: string
          resolved_at: string | null
          status: Database["public"]["Enums"]["report_status"]
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          id?: string
          listing_id?: string | null
          message_id?: string | null
          reason: string
          reported_user_id?: string | null
          reporter_id: string
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["report_status"]
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          id?: string
          listing_id?: string | null
          message_id?: string | null
          reason?: string
          reported_user_id?: string | null
          reporter_id?: string
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["report_status"]
        }
        Relationships: [
          {
            foreignKeyName: "reports_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reported_user_id_fkey"
            columns: ["reported_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_reporter_id_fkey"
            columns: ["reporter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string
          created_at: string
          id: string
          listing_id: string
          rating: number
          reviewed_user_id: string
          reviewer_id: string
          seller_response: string | null
          updated_at: string
        }
        Insert: {
          comment: string
          created_at?: string
          id?: string
          listing_id: string
          rating: number
          reviewed_user_id: string
          reviewer_id: string
          seller_response?: string | null
          updated_at?: string
        }
        Update: {
          comment?: string
          created_at?: string
          id?: string
          listing_id?: string
          rating?: number
          reviewed_user_id?: string
          reviewer_id?: string
          seller_response?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewed_user_id_fkey"
            columns: ["reviewed_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string
          description: string | null
          id: string
          listing_limit: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          listing_limit?: number
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          listing_limit?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      stripe_prices: {
        Row: {
          active: boolean
          created_at: string
          currency: string
          id: string
          metadata: Json | null
          product_id: string
          stripe_metadata: Json | null
          stripe_price_id: string
          unit_amount: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          currency: string
          id: string
          metadata?: Json | null
          product_id: string
          stripe_metadata?: Json | null
          stripe_price_id: string
          unit_amount: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json | null
          product_id?: string
          stripe_metadata?: Json | null
          stripe_price_id?: string
          unit_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "stripe_prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "stripe_products"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_products: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string
          product_type: string
          stripe_metadata: Json | null
          stripe_product_id: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name: string
          product_type: string
          stripe_metadata?: Json | null
          stripe_product_id: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string
          product_type?: string
          stripe_metadata?: Json | null
          stripe_product_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_packages: {
        Row: {
          activated_at: string | null
          amount: number
          bonus_listings_remaining: number | null
          created_at: string
          currency: string
          expires_at: string
          id: string
          is_featured: boolean
          listings_remaining: number
          package_id: string
          payment_status: string
          status: string
          stripe_payment_intent_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          activated_at?: string | null
          amount: number
          bonus_listings_remaining?: number | null
          created_at?: string
          currency?: string
          expires_at: string
          id?: string
          is_featured?: boolean
          listings_remaining: number
          package_id: string
          payment_status: string
          status: string
          stripe_payment_intent_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          activated_at?: string | null
          amount?: number
          bonus_listings_remaining?: number | null
          created_at?: string
          currency?: string
          expires_at?: string
          id?: string
          is_featured?: boolean
          listings_remaining?: number
          package_id?: string
          payment_status?: string
          status?: string
          stripe_payment_intent_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_packages_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          role_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          role_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_details: {
        Row: {
          brand: string
          color: string | null
          created_at: string
          listing_id: string
          mileage: number | null
          model: string
          payment_terms: string
          specs: string | null
          sub_category: string
          updated_at: string
          version: string | null
          year: number
        }
        Insert: {
          brand: string
          color?: string | null
          created_at?: string
          listing_id: string
          mileage?: number | null
          model: string
          payment_terms: string
          specs?: string | null
          sub_category: string
          updated_at?: string
          version?: string | null
          year: number
        }
        Update: {
          brand?: string
          color?: string | null
          created_at?: string
          listing_id?: string
          mileage?: number | null
          model?: string
          payment_terms?: string
          specs?: string | null
          sub_category?: string
          updated_at?: string
          version?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_details_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: true
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_requests: {
        Row: {
          admin_notes: string | null
          created_at: string
          document_expiry: string
          document_type: string
          document_urls: string[]
          id: string
          rejection_reason: string | null
          updated_at: string
          user_id: string
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          document_expiry: string 
          document_type: string
          document_urls: string[]
          id?: string
          rejection_reason?: string | null
          updated_at?: string
          user_id: string
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          document_expiry?: string
          document_number?: string
          document_type?: string
          document_urls?: string[]
          id?: string
          rejection_reason?: string | null
          updated_at?: string
          user_id?: string
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verification_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verification_requests_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_create_listing: {
        Args: {
          user_id_param: string
        }
        Returns: boolean
      }
      can_report_listing: {
        Args: {
          reporter_id_param: string
          listing_id_param: string
        }
        Returns: boolean
      }
      can_report_message: {
        Args: {
          reporter_id_param: string
          message_id_param: string
        }
        Returns: boolean
      }
      can_report_user: {
        Args: {
          reporter_id_param: string
          reported_user_id_param: string
        }
        Returns: boolean
      }
      can_user_review_listing: {
        Args: {
          reviewer_id_param: string
          listing_id_param: string
        }
        Returns: boolean
      }
      cube:
        | {
            Args: {
              "": number[]
            }
            Returns: unknown
          }
        | {
            Args: {
              "": number
            }
            Returns: unknown
          }
      cube_dim: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      cube_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      cube_is_point: {
        Args: {
          "": unknown
        }
        Returns: boolean
      }
      cube_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      cube_recv: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      cube_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      cube_size: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      earth: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      gc_to_sec: {
        Args: {
          "": number
        }
        Returns: number
      }
      generate_listing_slug: {
        Args: {
          title: string
          counter?: number
        }
        Returns: string
      }
      get_active_page: {
        Args: {
          slug_param: string
        }
        Returns: {
          content: string
          created_at: string
          id: string
          is_published: boolean
          last_updated_by: string | null
          meta_description: string | null
          meta_keywords: string | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
      }
      get_category_path: {
        Args: {
          category_id: string
        }
        Returns: {
          id: string
          name: string
          slug: string
          level: number
        }[]
      }
      get_cities_in_country: {
        Args: {
          country_id: string
        }
        Returns: {
          id: string
          name: string
          name_ar: string
          slug: string
          latitude: number
          longitude: number
        }[]
      }
      get_city_with_country: {
        Args: {
          input_city_id: string
        }
        Returns: {
          city_id: string
          city_name: string
          city_name_ar: string
          city_slug: string
          country_id: string
          country_name: string
          country_name_ar: string
          country_slug: string
        }[]
      }
      get_faq_article: {
        Args: {
          article_slug: string
        }
        Returns: {
          title: string
          content: string
          frontmatter: Json
          category_name: string
          category_slug: string
          updated_at: string
        }[]
      }
      get_faqs_by_category: {
        Args: {
          category_slug: string
        }
        Returns: {
          category_name: string
          category_description: string
          articles: Json
        }[]
      }
      get_listing_likes_count: {
        Args: {
          listing_id_param: string
        }
        Returns: number
      }
      get_nearby_cities: {
        Args: {
          lat: number
          lng: number
          radius_km?: number
        }
        Returns: {
          id: string
          name: string
          name_ar: string
          distance: number
        }[]
      }
      get_subcategories: {
        Args: {
          parent_category_id: string
        }
        Returns: {
          id: string
          name: string
          slug: string
          level: number
        }[]
      }
      get_user_active_listings_count: {
        Args: {
          user_id_param: string
        }
        Returns: number
      }
      get_user_email: {
        Args: {
          user_id: string
        }
        Returns: string
      }
      get_user_listing_limit: {
        Args: {
          user_id: string
        }
        Returns: number
      }
      get_user_rating: {
        Args: {
          user_id_param: string
        }
        Returns: {
          average_rating: number
          total_reviews: number
        }[]
      }
      get_user_reports_count: {
        Args: {
          user_id_param: string
        }
        Returns: {
          total_reports: number
          pending_reports: number
          resolved_reports: number
          dismissed_reports: number
        }[]
      }
      get_verification_doc_url: {
        Args: {
          file_path: string
        }
        Returns: string
      }
      has_user_liked_listing: {
        Args: {
          user_id_param: string
          listing_id_param: string
        }
        Returns: boolean
      }
      is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      latitude: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      longitude: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      resolve_report: {
        Args: {
          report_id_param: string
          status_param: Database["public"]["Enums"]["report_status"]
          admin_notes_param?: string
        }
        Returns: undefined
      }
      sec_to_gc: {
        Args: {
          "": number
        }
        Returns: number
      }
      uuid_generate_v1: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      uuid_generate_v1mc: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      uuid_generate_v3: {
        Args: {
          namespace: string
          name: string
        }
        Returns: string
      }
      uuid_generate_v4: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      uuid_generate_v5: {
        Args: {
          namespace: string
          name: string
        }
        Returns: string
      }
      uuid_nil: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      uuid_ns_dns: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      uuid_ns_oid: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      uuid_ns_url: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      uuid_ns_x500: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      notification_type:
        | "message"
        | "review"
        | "like"
        | "verification"
        | "listing"
        | "report"
      report_status: "pending" | "resolved" | "dismissed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
