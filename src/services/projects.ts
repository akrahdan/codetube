import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { head } from "lodash";
import cookie from "react-cookies";
import { RootState } from "store";
import { CategoryResponse, CourseResponse, CoursePlayerResponse, Instructor, InstructorResponse, Options } from "./courses";
export interface TitleDescription {
  id: number;
  title: string;
  description: string;
  project: number;
}

export interface HeaderDescription {
  id: number;
  heading: string;
  description: string;
  projects: number[];
}

export interface ProjectPricing {
  amount: string;
  currency: string;
  project: number;
}

export interface Review {
  id: number;
  state: string;
}



export interface Course {
  id: number;
  title: string;
  description: string;
  url: string;
  tags: string[];
}

export interface Cart {
  project_id: number;
  detail: string;
}

export interface Order {
  orderID: string;
}

export interface Wave {
  txRef: string;
}

export interface OrderResponse {
  project: ProjectEntityResponse
}


export interface ProjectEntityResponse {
  id: number;
  title: string;
  lead: Boolean;
  description: string;
  slug: string;
  goal: string;
  level: string;
  hero: string;
  instructor: InstructorResponse;
  category: number;
  thumbnail_url: string;
  experience: string;
  courses: CoursePlayerResponse[];
  completion_time: string;
  related: ProjectEntityResponse[];
  header: HeaderDescription;
  header_primary_color: string;
  header_secondary_color: string;
  video_headline: string;
  difficulty: string;
  progress: string;
  tags: string[];
  state: string;
  price: Number;
  outcomes: TitleDescription[];
  included: TitleDescription[];
  syllabuses: TitleDescription[];
}

export interface ProjectEntityRequest {
  id: number;
  title: string;
  lead: Boolean;
  description: string;
  slug: string;
  goal: string;
  level: string;
  hero: string;
  category: number;
  thumbnail_url: string;
  experience: string;
  courses: number[];
  completion_time: string;
  header_primary_color: string;
  header_secondary_color: string;
  video_headline: string;
  difficulty: string;
  progress: string;
  tags: string[];
  state: string;
  price: Number;
  outcomes: number[];
  included: number[];
  syllabuses: number[];

}

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    prepareHeaders: (headers, { getState }) => {
      const csrfToken = cookie.load("csrftoken");

      if (csrfToken) {
        headers.set("X-CSRFToken", csrfToken);
      }
      const token =
        (getState() as RootState).auth.token || localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }

      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),

  tagTypes: ["ProjectEntityResponse"],
  endpoints: (build) => ({
    fetchProjects: build.query<ProjectEntityResponse[], void>({
      query: () => ({
        url: "/api/projects/",
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),

    fetchDetailProject: build.query<ProjectEntityResponse, string>({
      query: (slug) => ({
        url: `/api/project/${slug}/`,
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),

    fetchInstructorProjects: build.query<ProjectEntityResponse[], void>({
      query: (id) => ({
        url: `/api/instructor/projects/`,
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),


    fetchProjectCategories: build.query<CategoryResponse[], void>({
      query: () => ({
        url: "/api/project_categories",
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),


    fetchProject: build.query<ProjectEntityResponse, number>({
      query: (id) => ({
        url: `/api/projects/${id}`,
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),
    createProject: build.mutation<
      ProjectEntityResponse,
      Partial<ProjectEntityResponse>
    >({
      query: (body) => ({
        url: "/api/projects/create/",
        method: "POST",
        body,
        responseHandler: (response) => response.json(),
      }),
    }),

    updateProject: build.mutation<
    ProjectEntityResponse,
      Partial<ProjectEntityRequest>
    >({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `/api/projects/${id}/edit/`,
          method: "PUT",
          body,
          responseHandler: (response) => response.json(),
        };
      },
    }),

    createProjectPricing: build.mutation<ProjectPricing, Partial<ProjectPricing>>({
      query: (body) => ({
        url: "/api/projects/pricing/project/create/",
        body,
        method: "POST",
        responseHandler: (response) => response.json(),
      }),
    }),

    updateProjectPricing: build.mutation<ProjectPricing, Partial<ProjectPricing>>({
      query: (body) => {
        const {project, ...rest } = body
        return {
          url: `/api/projects/${project}/pricing/`,
          body,
          method: "PUT",
          responseHandler: (response) => response.json(),
        };
      },
    }),

    fetchProjectPricingTier: build.query<Options[], void>({
      query: () => ({
        url: "/api/projects/pricing/tier/",
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),

    fetchProjectPricingCurrency: build.query<Options[], void>({
      query: () => ({
        url: "/api/projects/pricing/currency/",
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),

    fetchProjectPricing: build.query<ProjectPricing, number>({
      query: (id) => ({
        url: `/api/projects/${id}/pricing/`,
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),

    cartUpdate: build.mutation<Cart, Partial<Cart>>({
      query: (body) => ({
        url: "/api/cart/update/",
        body,
        method: "POST",
        responseHandler: (response) => response.json(),
      }),
    }),

    checkout: build.mutation<Object, Partial<Order>>({
      query: (body) => ({
        url: "/api/cart/checkout/",
        body,
        method: "POST",
        responseHandler: (response) => response.json(),
      }),
    }),

    checkoutWave: build.mutation<Object, Partial<Wave>>({
      query: (body) => ({
        url: "/api/cart/checkout_wave/",
        body,
        method: "POST",
        responseHandler: (response) => response.json(),
      }),
    }),

    createSyllabus: build.mutation<
      TitleDescription[],
      Partial<TitleDescription>
    >({
      query: (body) => ({
        url: "/api/projects/syllabus/create/",
        body,
        method: "POST",
        responseHandler: (response) => response.json(),
      }),
    }),

    createIncluded: build.mutation<
      TitleDescription[],
      Partial<TitleDescription>
    >({
      query: (body) => ({
        url: "/api/projects/included/create/",
        body,
        method: "POST",
        responseHandler: (response) => response.json(),
      }),
    }),

    createLearningOutcome: build.mutation<
      TitleDescription[],
      Partial<TitleDescription>
    >({
      query: (body) => ({
        url: "/api/projects/outcome/create/",
        body,
        method: "POST",
        responseHandler: (response) => response.json(),
      }),
    }),

    createHeading: build.mutation<
      HeaderDescription,
      Partial<HeaderDescription>
    >({
      query: (body) => ({
        url: "/api/projects/heading/create/",
        body,
        method: "POST",
        responseHandler: (response) => response.json(),
      }),
    }),

    editSyllabus: build.mutation<TitleDescription, Partial<TitleDescription>>({
      query: ({ id, ...body }) => ({
        url: `/api/projects/syllabus/${id}/`,
        body,
        method: "PUT",
        responseHandler: (response) => response.json(),
      }),
    }),

    editIncluded: build.mutation<TitleDescription, Partial<TitleDescription>>({
      query: ({ id, ...body }) => ({
        url: `/api/projects/included/${id}/`,
        body,
        method: "PUT",
        responseHandler: (response) => response.json(),
      }),
    }),

    editHeading: build.mutation<HeaderDescription, Partial<HeaderDescription>>({
      query: ({ id, ...body }) => {
        return {
          url: `/api/projects/heading/${id}/`,
          method: "PUT",
          body,
        };
      },
    }),

    editLearningOutcome: build.mutation<
      TitleDescription,
      Partial<TitleDescription>
    >({
      query: ({id, ...body}) => ({
        url: `/api/projects/outcome/${id}/`,
        body,
        method: "PUT",
        responseHandler: (response) => response.json(),
      }),
    }),

    submitReview: build.mutation<Review, Partial<Review>>({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `/api/projects/${id}/review/`,
          body,
          method: "PUT",
          responseHandler: (response) => response.json(),
        };
      },
    }),

    fetchOutcomes: build.query<TitleDescription[], number>({
      query: (pk) => ({
        url: `/api/projects/${pk}/outcomes/`,
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),

    fetchIncluded: build.query<TitleDescription[], number>({
      query: (pk) => ({
        url: `/api/projects/${pk}/included/`,
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),
    fetchSyllabus: build.query<TitleDescription[], Partial<number>>({
      query: (id) => {
        return {
          url: `/api/projects/${id}/syllabuses/`,
          method: "GET",
        };
      },
    }),

    getMyProjects: build.query<OrderResponse[], void>({
      query: () => ({
        url: "/api/orders/my_projects",
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),

    deleteSyllabus: build.mutation<TitleDescription, Partial<number>>({
      query: (id) => {
        return {
          url: `/api/projects/syllabus/${id}/`,
          method: "DELETE",
        };
      },
    }),

    deleteHeading: build.mutation<TitleDescription, Partial<number>>({
      query: (id) => {
        return {
          url: `/api/projects/heading/${id}/`,
          method: "DELETE",
        };
      },
    }),

    deleteIncluded: build.mutation<TitleDescription, Partial<number>>({
      query: (id) => {
        return {
          url: `/api/projects/included/${id}/`,
          method: "DELETE",
        };
      },
    }),
    deleteOutcome: build.mutation<TitleDescription, Partial<number>>({
      query: (id) => {
        return {
          url: `/api/projects/outcome/${id}/`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useFetchProjectsQuery,
  useCreateHeadingMutation,
  useCreateIncludedMutation,
  useCreateLearningOutcomeMutation,
  useCreateProjectPricingMutation,
  useCreateProjectMutation,
  useCreateSyllabusMutation,
  useDeleteHeadingMutation,
  useDeleteIncludedMutation,
  useDeleteOutcomeMutation,
  useDeleteSyllabusMutation,
  useEditHeadingMutation,
  useEditIncludedMutation,
  useEditLearningOutcomeMutation,
  useEditSyllabusMutation,
  useFetchIncludedQuery,
  useFetchOutcomesQuery,
  useFetchSyllabusQuery,
  useLazyFetchIncludedQuery,
  useLazyFetchOutcomesQuery,
  useLazyFetchProjectsQuery,
  useLazyFetchSyllabusQuery,
  useUpdateProjectMutation,
  useSubmitReviewMutation,
  useFetchProjectQuery,
  useCartUpdateMutation,
  useCheckoutMutation,
  useCheckoutWaveMutation,
  useGetMyProjectsQuery,
  useFetchInstructorProjectsQuery,
  useFetchProjectCategoriesQuery,
  useFetchDetailProjectQuery,
  useFetchProjectPricingCurrencyQuery,
  useFetchProjectPricingQuery,
  useFetchProjectPricingTierQuery,
  useUpdateProjectPricingMutation
  
} = projectApi;
