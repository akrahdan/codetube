import { createApi, fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/dist/query/react";
import algoliasearch from "algoliasearch/lite";

import { RootState } from "store";
import cookie from "react-cookies";
import { DateTime } from "schema-dts";

import axios, { AxiosRequestConfig, AxiosError } from 'axios'

const axiosBaseQuery = (
  { baseUrl }: { baseUrl: string } = { baseUrl: '' }
): BaseQueryFn<
  {
    url: string
    method: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
  },
  unknown,
  unknown
> => async ({ url, method, data }) => {
  try {
    const result = await axios({ url: baseUrl + url, method, data })
    return { data: result.data }
  } catch (axiosError) {
    let err = axiosError as AxiosError
    return { error: { status: err.response?.status, data: err.response?.data } }
  }
}

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_KEY
);

export interface CourseResponse {
  title: string;
  id: number;
  category: number;
  description: string;
  cover_image: string;
  video_url: string;
  headline: string;
  level: string;
  tags: string[];

  subcategory: number;
  price: number;
  state: string;
}

export interface CoursePlayerResponse {
  title: string;
  id: number;
  category: CategoryResponse;
  description: string;
  cover_image: string;
  slug: string;
  video_url: string;
  headline: string;
  level: string;
  sections: Section[];
  tags: string[];
  url: string;
  instructor: InstructorResponse;
  subcategory: number;
  goals: Goal[];
  experiences: Experience[];
  requirements: Requirement[];
  price: number;
  state: string;
}

export interface Instructor {
  id: string;
  headline: string;
  first_name: string;
  last_name: string;
  email: string;
  description: string;
  avatar: string;
}

export interface InstructorSearchResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  user: User;
 
}

export interface InstructorResponse {
  id: string;
  headline: string;
  first_name: string;
  last_name: string;
  email: string;
  courses: CourseResponse[];
  avatar: string;
  user: User;
  description: string;
}

export interface User {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
}

export interface MediaRequest {
  course: number;
  name: string;
  filetype: string;
  key: string;
  size: number;
}

export interface MediaResponse {
  course: number;
  name: string;
  filetype: string;
  key: string;
  id: number;
  url?: string;
  size: number;
  timestamp: string;
}

export interface SearchResponse {
  title: string;
  tags: string[];
}

export interface CourseRequest {
  id: number;
  title: string;
  category: number;
  description: string;
  cover_image: string;
  video_url: string;
  level: string;
  tags: string[];
  headline: string;
  subcategory: number;
  price: number;
}

export interface Section {
  title: string;
  id: number;
  course: number;
  duration: number;
  instructor: number;
  description: string;
  order: number;
  resources: number[];
  lectures?: Lecture[];
}

export interface Experience {
  name: string;
  id: number;
  course: number;
}

export interface Goal {
  name: string;
  id: number;
  course: number;
}

export interface Requirement {
  name: string;
  id: number;
  course: number;
}

export interface SectionRequest {
  title: string;
  id: number;
  course: number;
  description?: string;
  position: string;
  neighbor: number;
}

export interface LectureRequest {
  title: string;
  id: number;
  video: number;
  video_url: string;
  section: number;
  resources: number[];
  description?: string;
  position: string;
  neighbor: number;
}

export interface Options {
  name: string;
  display: string;
}

export interface Pricing {
  amount: string;
  currency: string;
  course: number;
}

export interface Lecture {
  title: string;
  id: number;
  position: string;
  neighbor: number;
  duration: number;
  description: string;
  video: MediaResponse;
  resources: number[];
  instructor: number;
  section: number;
  video_url: string;
  order: number;
}

export interface Review {
  id: number;
  state: string;
}

export interface Views {
  id: number;
}

export interface ViewsResponse {
  object_id: number;
}

export interface VideoAnalytics {
  id: number;
  thumbnail: string;
  lecture: number;
  progress: number;
  updated: string;
  complete: boolean;
}

export interface CategoryResponse {
  title: string;
  parent: CategoryResponse;
  id: number;
  children: CategoryResponse[];
}

export const autoSearch = (query: string) => {
  searchClient
    .initIndex("tags_index")
    .search(query)
    .then(({ hits }) => console.log("Hits: ", hits))
    .catch((err) => console.log("Error: ", err));
};

export const coursesApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/`,
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
  tagTypes: ["Review"],
  endpoints: (build) => ({
    fetchCourse: build.query<CourseResponse, number>({
      query: (id) => ({
        url: `/api/instructor/courses/${id}`,
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),

   

    fetchPlayerCourse: build.query<CoursePlayerResponse, number>({
      query: (id) => ({
        url: `/api/courses/${id}/`,
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),
    fetchCourseDetail: build.query<CoursePlayerResponse, string>({
      query: (slug) => ({
        url: `/api/course/${slug}/`,
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),
    trackViews: build.mutation<ViewsResponse[], Views>({
      query: ({ id, ...body }) => ({
        url: `/api/courses/lecture/${id}/views/`,
        method: "POST",
        body,
        responseHandler: (response) => response.json(),
      }),
    }),

    fetchViews: build.query<ViewsResponse[], void>({
      query: () => ({
        url: `/api/courses/lecture/views/`,
        method: "GET",

        responseHandler: (response) => response.json(),
      }),
    }),

    fetchVideoViews: build.query<VideoAnalytics[], Partial<number>>({
      query: (id) => ({
        url: `/api/analytics/${id}/`,
        method: "GET",

        responseHandler: (response) => response.json(),
      }),
    }),

    updateVideoViews: build.mutation<VideoAnalytics, Partial<VideoAnalytics>>({
      query: ({ id, ...body }) => ({
        url: `/api/analytics/${id}/edit/`,
        method: "PUT",
        body,
        responseHandler: (response) => response.json(),
      }),
    }),

    fetchCourseViews: build.query<VideoAnalytics[], void>({
      query: () => ({
        url: `/api/analytics/views/`,
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),

    fetchInstructorCourses: build.query<CoursePlayerResponse[], void>({
      query: (id) => ({
        url: `/api/instructor/courses/`,
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),

    editInstructorInfo: build.mutation<InstructorResponse, Partial<Instructor>>(
      {
        query: (body) => ({
          url: `/api/instructor/edit-info/`,
          method: "POST",
          body,
          responseHandler: (response) => response.json(),
        }),
      }
    ),

    fetchInstructorInfo: build.query<InstructorResponse, void>({
      query: () => ({
        url: `/api/instructor/profile/`,
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),

    fetchInstructors: build.query<InstructorSearchResponse[], void>({
      query: () => ({
        url: `/api/instructor/search/`,
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),

    fetchCategories: build.query<CategoryResponse[], void>({
      query: () => ({
        url: "/api/categories/",
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),

    fetchCourseLevel: build.query<Options[], void>({
      query: () => ({
        url: "/api/courses/level/",
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),

    fetchPricingTier: build.query<Options[], void>({
      query: () => ({
        url: "/api/courses/pricing/tier/",
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),

    fetchPricingCurrency: build.query<Options[], void>({
      query: () => ({
        url: "/api/courses/pricing/currency/",
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),

    fetchPricing: build.query<Pricing, number>({
      query: (id) => ({
        url: `/api/courses/${id}/pricing/`,
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),

    fetchSections: build.query<Section[], number>({
      query: (pk) => ({
        url: `/api/courses/${pk}/sections/`,
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),

    searchTags: build.query<SearchResponse[], string>({
      query: (q) => ({
        url: `/api/courses/search?q=${q}`,
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),
    createCourse: build.mutation<CourseResponse, Partial<CourseRequest>>({
      query: (body) => ({
        url: "/api/courses/create/",
        method: "POST",
        body,
        responseHandler: (response) => response.json(),
      }),
    }),

    updateCourse: build.mutation<CourseResponse, Partial<CourseRequest>>({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `/api/courses/${id}/edit/`,
          method: "PUT",
          body,
          responseHandler: (response) => response.json(),
        };
      },
    }),

    uploadLectureVideo: build.mutation<MediaResponse, Partial<MediaRequest>>({
      query: (body) => ({
        url: "/api/courses/lecture/video_upload/",
        method: "POST",
        body,
        responseHandler: (response) => response.json(),
      }),
    }),
    createSection: build.mutation<Section[], Partial<SectionRequest>>({
      query: (body) => ({
        url: "/api/courses/section/create/",
        body,
        method: "POST",
        responseHandler: (response) => response.json(),
      }),
    }),

    createGoal: build.mutation<Goal[], Partial<Goal>>({
      query: (body) => ({
        url: "/api/courses/goal/create/",
        body,
        method: "POST",
        responseHandler: (response) => response.json(),
      }),
    }),

    createPricing: build.mutation<Pricing, Partial<Pricing>>({
      query: (body) => ({
        url: "/api/courses/pricing/create/",
        body,
        method: "POST",
        responseHandler: (response) => response.json(),
      }),
    }),

    updatePricing: build.mutation<Pricing, Partial<Pricing>>({
      query: (body) => {
        const {course, ...rest } = body
        return {
          url: `/api//courses/${course}/pricing/`,
          body,
          method: "PUT",
          responseHandler: (response) => response.json(),
        };
      }
    }),

    createExperience: build.mutation<Experience[], Partial<Experience>>({
      query: (body) => ({
        url: "/api/courses/experience/create/",
        body,
        method: "POST",
        responseHandler: (response) => response.json(),
      }),
    }),

    createRequirement: build.mutation<Requirement[], Partial<Requirement>>({
      query: (body) => ({
        url: "/api/courses/requirement/create/",
        body,
        method: "POST",
        responseHandler: (response) => response.json(),
      }),
    }),

    editRequirement: build.mutation<Requirement, Partial<Requirement>>({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `/api//courses/requirements/${id}/`,
          body,
          method: "PUT",
          responseHandler: (response) => response.json(),
        };
      },
    }),

    editExperience: build.mutation<Experience, Partial<Experience>>({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `/api//courses/experience/${id}/`,
          body,
          method: "PUT",
          responseHandler: (response) => response.json(),
        };
      },
    }),

    editGoal: build.mutation<Goal, Partial<Goal>>({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `/api/courses/goals/${id}/`,
          body,
          method: "PUT",
          responseHandler: (response) => response.json(),
        };
      },
    }),

    submitReview: build.mutation<Review, Partial<Review>>({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `/api/courses/${id}/review/`,
          body,
          method: "PUT",
          responseHandler: (response) => response.json(),
        };
      },
    }),

    fetchExperience: build.query<Experience[], number>({
      query: (pk) => ({
        url: `/api/courses/${pk}/experience/`,
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),

    fetchGoals: build.query<Goal[], number>({
      query: (pk) => ({
        url: `/api/courses/${pk}/goals/`,
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),

    fetchRequirements: build.query<Requirement[], number>({
      query: (pk) => ({
        url: `/api/courses/${pk}/requirements/`,
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),
    deleteExperience: build.mutation<Experience, Partial<number>>({
      query: (id) => {
        return {
          url: `/api/courses/experience/${id}/`,
          method: "DELETE",
        };
      },
    }),

    deleteGoal: build.mutation<Goal, Partial<number>>({
      query: (id) => {
        return {
          url: `/api/courses/goals/${id}/`,
          method: "DELETE",
        };
      },
    }),

    deleteRequirement: build.mutation<Requirement, Partial<number>>({
      query: (id) => {
        return {
          url: `/api/courses/requirements/${id}/`,
          method: "DELETE",
        };
      },
    }),

    editSection: build.mutation<Section, Partial<SectionRequest>>({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `/api/courses/sections/${id}/`,
          body,
          method: "PUT",
        };
      },
    }),

    deleteSection: build.mutation<Section, Partial<number>>({
      query: (id) => {
        return {
          url: `/api/courses/sections/${id}/`,
          method: "DELETE",
        };
      },
    }),

    createLecture: build.mutation<Lecture[], Partial<Lecture>>({
      query: (body) => ({
        url: "/api/courses/lecture/create/",
        body,
        method: "POST",
        responseHandler: (response) => response.json(),
      }),
    }),
    fetchLectures: build.query<Lecture[], number>({
      query: (pk) => ({
        url: `/api/courses/section/${pk}/lectures/`,
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),

    fetchResources: build.query<MediaResponse[], number>({
      query: (pk) => ({
        url: `/api/courses/${pk}/resources/`,
        method: "GET",
        responseHandler: (response) => response.json(),
      }),
    }),

    createResource: build.mutation<MediaResponse[], MediaRequest>({
      query: (data) => {
        const { course, ...body } = data;
        return {
          url: `/api/courses/${course}/resources/`,
          method: "POST",
          body,
          responseHandler: (response) => response.json(),
        };
      },
    }),

    editLecture: build.mutation<Lecture, Partial<LectureRequest>>({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `/api/courses/section/lectures/${id}/`,
          body,
          method: "PUT",
        };
      },
    }),

    deleteLecture: build.mutation<Lecture, Partial<number>>({
      query: (id) => {
        return {
          url: `/api/courses/section/lectures/${id}/`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useCreateLectureMutation,
  useCreateSectionMutation,
  useFetchCourseQuery,
  useFetchCategoriesQuery,
  useFetchCourseLevelQuery,
  useSearchTagsQuery,
  useUploadLectureVideoMutation,
  useFetchSectionsQuery,
  useDeleteSectionMutation,
  useEditSectionMutation,
  useDeleteLectureMutation,
  useEditLectureMutation,
  useFetchLecturesQuery,
  useFetchResourcesQuery,
  useCreateResourceMutation,
  useUpdateCourseMutation,
  useCreateExperienceMutation,
  useCreateGoalMutation,
  useCreateRequirementMutation,
  useEditExperienceMutation,
  useEditGoalMutation,
  useEditRequirementMutation,
  useFetchExperienceQuery,
  useFetchGoalsQuery,
  useFetchRequirementsQuery,
  useDeleteExperienceMutation,
  useDeleteGoalMutation,
  useDeleteRequirementMutation,
  useFetchPricingCurrencyQuery,
  useFetchPricingTierQuery,
  useCreatePricingMutation,
  useFetchPricingQuery,
  useSubmitReviewMutation,
  useFetchInstructorCoursesQuery,
  useEditInstructorInfoMutation,
  useFetchInstructorInfoQuery,
  useFetchPlayerCourseQuery,
  useTrackViewsMutation,
  useFetchViewsQuery,
  useFetchVideoViewsQuery,
  useUpdateVideoViewsMutation,
  useFetchCourseViewsQuery,
  useFetchCourseDetailQuery,
  useUpdatePricingMutation,
  useFetchInstructorsQuery
} = coursesApi;

export const { updateVideoViews } = coursesApi.endpoints;
