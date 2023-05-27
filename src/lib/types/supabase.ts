export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      batches: {
        Row: {
          courseId: string
          created_at: string
          id: string
          numberOfStudents: number
          timeSlot: string
        }
        Insert: {
          courseId: string
          created_at?: string
          id?: string
          numberOfStudents: number
          timeSlot: string
        }
        Update: {
          courseId?: string
          created_at?: string
          id?: string
          numberOfStudents?: number
          timeSlot?: string
        }
      }
      cart: {
        Row: {
          batchId: string
          courseId: string
          createdAt: string
          id: string
          userId: string
        }
        Insert: {
          batchId: string
          courseId: string
          createdAt?: string
          id: string
          userId?: string
        }
        Update: {
          batchId?: string
          courseId?: string
          createdAt?: string
          id?: string
          userId?: string
        }
      }
      classes: {
        Row: {
          batch_id: string
          course_id: string
          created_at: string
          id: string
          is_finished: boolean
          lecture_id: string
          mentor_id: string
          module_id: string
          timestamp: string
        }
        Insert: {
          batch_id: string
          course_id: string
          created_at?: string
          id?: string
          is_finished?: boolean
          lecture_id: string
          mentor_id?: string
          module_id: string
          timestamp: string
        }
        Update: {
          batch_id?: string
          course_id?: string
          created_at?: string
          id?: string
          is_finished?: boolean
          lecture_id?: string
          mentor_id?: string
          module_id?: string
          timestamp?: string
        }
      }
      course: {
        Row: {
          applicationCloseDate: string
          category: string
          classStartDate: string
          congratulationsMessage: string
          courseFor: Json
          createdAt: string
          description: string
          duration: number
          id: string
          introFile: string
          language: string
          learningObjectives: Json
          level: string
          mentorId: string
          prerequisites: Json
          price: number
          subTitle: string
          thumbnail: string
          title: string
          weekOff: Json
          welcomeMessage: string
        }
        Insert: {
          applicationCloseDate: string
          category: string
          classStartDate: string
          congratulationsMessage: string
          courseFor: Json
          createdAt?: string
          description: string
          duration: number
          id?: string
          introFile: string
          language: string
          learningObjectives: Json
          level: string
          mentorId?: string
          prerequisites: Json
          price: number
          subTitle: string
          thumbnail: string
          title: string
          weekOff: Json
          welcomeMessage: string
        }
        Update: {
          applicationCloseDate?: string
          category?: string
          classStartDate?: string
          congratulationsMessage?: string
          courseFor?: Json
          createdAt?: string
          description?: string
          duration?: number
          id?: string
          introFile?: string
          language?: string
          learningObjectives?: Json
          level?: string
          mentorId?: string
          prerequisites?: Json
          price?: number
          subTitle?: string
          thumbnail?: string
          title?: string
          weekOff?: Json
          welcomeMessage?: string
        }
      }
      draft: {
        Row: {
          content: Json
          createdAt: string
          id: string
          progress: number
          userId: string
        }
        Insert: {
          content?: Json
          createdAt?: string
          id: string
          progress?: number
          userId?: string
        }
        Update: {
          content?: Json
          createdAt?: string
          id?: string
          progress?: number
          userId?: string
        }
      }
      lectures: {
        Row: {
          createdAt: string
          date: string
          id: string
          isFinished: boolean
          moduleId: string
          title: string
        }
        Insert: {
          createdAt?: string
          date: string
          id?: string
          isFinished?: boolean
          moduleId: string
          title: string
        }
        Update: {
          createdAt?: string
          date?: string
          id?: string
          isFinished?: boolean
          moduleId?: string
          title?: string
        }
      }
      mentor: {
        Row: {
          addressLine1: string
          addressLine2: string
          city: string
          createdAt: string
          description: string
          documents: boolean
          experience: string
          id: string
          identity: string
          isVerified: boolean
          language: string
          motive: string
          name: string
          niche: string
          pancard: string
          postal: number
          state: string
          teaching: boolean
          video: string
        }
        Insert: {
          addressLine1: string
          addressLine2: string
          city: string
          createdAt?: string
          description: string
          documents: boolean
          experience: string
          id?: string
          identity: string
          isVerified?: boolean
          language: string
          motive: string
          name: string
          niche: string
          pancard: string
          postal: number
          state: string
          teaching: boolean
          video: string
        }
        Update: {
          addressLine1?: string
          addressLine2?: string
          city?: string
          createdAt?: string
          description?: string
          documents?: boolean
          experience?: string
          id?: string
          identity?: string
          isVerified?: boolean
          language?: string
          motive?: string
          name?: string
          niche?: string
          pancard?: string
          postal?: number
          state?: string
          teaching?: boolean
          video?: string
        }
      }
      modules: {
        Row: {
          createdAt: string
          id: string
          title: string
        }
        Insert: {
          createdAt?: string
          id?: string
          title: string
        }
        Update: {
          createdAt?: string
          id?: string
          title?: string
        }
      }
      order: {
        Row: {
          batchId: string
          courseId: string
          createdAt: string
          id: string
          paymentId: string
          userId: string
        }
        Insert: {
          batchId: string
          courseId: string
          createdAt?: string
          id: string
          paymentId: string
          userId: string
        }
        Update: {
          batchId?: string
          courseId?: string
          createdAt?: string
          id?: string
          paymentId?: string
          userId?: string
        }
      }
      payment: {
        Row: {
          amount: number
          batchId: string | null
          courseId: string
          createdAt: string | null
          id: string
          status: string
          userId: string | null
        }
        Insert: {
          amount?: number
          batchId?: string | null
          courseId: string
          createdAt?: string | null
          id: string
          status: string
          userId?: string | null
        }
        Update: {
          amount?: number
          batchId?: string | null
          courseId?: string
          createdAt?: string | null
          id?: string
          status?: string
          userId?: string | null
        }
      }
      post: {
        Row: {
          authorId: string
          content: string
          courseId: string | null
          createdAt: string
          id: string
          image: string
          is_video: boolean
        }
        Insert: {
          authorId?: string
          content: string
          courseId?: string | null
          createdAt?: string
          id?: string
          image: string
          is_video?: boolean
        }
        Update: {
          authorId?: string
          content?: string
          courseId?: string | null
          createdAt?: string
          id?: string
          image?: string
          is_video?: boolean
        }
      }
      post_comment: {
        Row: {
          content: string
          createdAt: string
          id: string
          postId: string
          userId: string
        }
        Insert: {
          content: string
          createdAt?: string
          id?: string
          postId: string
          userId?: string
        }
        Update: {
          content?: string
          createdAt?: string
          id?: string
          postId?: string
          userId?: string
        }
      }
      post_like: {
        Row: {
          createdAt: string
          id: string
          postId: string
          userId: string
        }
        Insert: {
          createdAt?: string
          id?: string
          postId: string
          userId?: string
        }
        Update: {
          createdAt?: string
          id?: string
          postId?: string
          userId?: string
        }
      }
      profiles: {
        Row: {
          bio: string | null
          cover: string | null
          createdAt: string
          dateOfBirth: string
          displayName: string
          id: string
          image: string | null
          intrests: Json
          isMentor: boolean
          isVerified: boolean
          social: Json | null
          username: string
        }
        Insert: {
          bio?: string | null
          cover?: string | null
          createdAt?: string
          dateOfBirth: string
          displayName: string
          id?: string
          image?: string | null
          intrests?: Json
          isMentor?: boolean
          isVerified?: boolean
          social?: Json | null
          username: string
        }
        Update: {
          bio?: string | null
          cover?: string | null
          createdAt?: string
          dateOfBirth?: string
          displayName?: string
          id?: string
          image?: string | null
          intrests?: Json
          isMentor?: boolean
          isVerified?: boolean
          social?: Json | null
          username?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_course: {
        Args: {
          title: string
          subtitle: string
          description: string
          language: string
          level: string
          category: string
          introfile: string
          thumbnail: string
          learningobjectives: Json
          prerequisites: Json
          coursefor: Json
          welcomemessage: string
          congratulationsmessage: string
          price: number
          mentorid: string
          weekoff: Json
          duration: number
          applicationclosedate: string
          classstartdate: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
