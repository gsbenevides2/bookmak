/* eslint-disable @typescript-eslint/no-empty-interface */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from "openapi-client-axios";

declare namespace Components {
  namespace Schemas {
    /**
     * AccountActivateResponse
     */
    export interface AccountActivateResponse {
      result?: "ok";
    }
    /**
     * ApiClient
     */
    export interface ApiClient {
      id?: string; // uuid
      type?: "api_client";
      attributes?: /* ApiClientAttributes */ ApiClientAttributes;
      relationships?: /* Relationship */ Relationship[];
    }
    /**
     * ApiClientAttributes
     */
    export interface ApiClientAttributes {
      name?: string;
      description?: string | null;
      profile?: string;
      externalClientId?: string | null;
      isActive?: boolean;
      state?: "requested" | "approved" | "rejected" | "autoapproved";
      createdAt?: string;
      updatedAt?: string;
      version?: number;
    }
    /**
     * ApiClientCreate
     */
    export interface ApiClientCreate {
      name: string;
      description?: string | null;
      profile: "personal";
      version?: number;
    }
    /**
     * ApiClient
     */
    export interface ApiClientEdit {
      description?: string | null;
      version: number;
    }
    /**
     * ApiClientList
     */
    export interface ApiClientList {
      result?: string;
      response?: string;
      data?: /* ApiClient */ ApiClient[];
      limit?: number;
      offset?: number;
      total?: number;
    }
    /**
     * ApiClientResponse
     */
    export interface ApiClientResponse {
      result?: string;
      response?: string;
      data?: /* ApiClient */ ApiClient;
    }
    /**
     * Author
     */
    export interface Author {
      id?: string; // uuid
      type?: "author";
      attributes?: /* AuthorAttributes */ AuthorAttributes;
      relationships?: /* Relationship */ Relationship[];
    }
    /**
     * AuthorAttributes
     */
    export interface AuthorAttributes {
      name?: string;
      imageUrl?: string | null;
      biography?: /* LocalizedString */ LocalizedString;
      twitter?: string | null; // uri ^https?://twitter\.com(/|$)
      pixiv?: string | null; // uri ^https?://([\w-]+\.)?pixiv\.net(/|$)
      melonBook?: string | null; // uri ^https?://([\w-]+\.)?melonbooks\.co\.jp(/|$)
      fanBox?: string | null; // uri ^https?://([\w-]+\.)?fanbox\.cc(/|$)
      booth?: string | null; // uri ^https?://([\w-]+\.)?booth\.pm(/|$)
      nicoVideo?: string | null; // uri ^https?://([\w-]+\.)?nicovideo\.jp(/|$)
      skeb?: string | null; // uri ^https?://([\w-]+\.)?skeb\.jp(/|$)
      fantia?: string | null; // uri ^https?://([\w-]+\.)?fantia\.jp(/|$)
      tumblr?: string | null; // uri ^https?://([\w-]+\.)?tumblr\.com(/|$)
      youtube?: string | null; // uri ^https?://www\.youtube\.com(/|$)
      weibo?: string | null; // uri ^https?://([\w-]+\.)?weibo\.(cn|com)(/|$)
      naver?: string | null; // uri ^https?://([\w-]+\.)?naver\.com(/|$)
      namicomi?: string | null; // uri ^https?://([\w-]+\.)?namicomi\.com(/|$)
      website?: string | null; // uri ^https?://
      version?: number;
      createdAt?: string;
      updatedAt?: string;
    }
    /**
     * AuthorCreate
     */
    export interface AuthorCreate {
      name: string;
      biography?: /* LocalizedString */ LocalizedString;
      twitter?: string | null; // uri ^https?://twitter\.com(/|$)
      pixiv?: string | null; // uri ^https?://([\w-]+\.)?pixiv\.net(/|$)
      melonBook?: string | null; // uri ^https?://([\w-]+\.)?melonbooks\.co\.jp(/|$)
      fanBox?: string | null; // uri ^https?://([\w-]+\.)?fanbox\.cc(/|$)
      booth?: string | null; // uri ^https?://([\w-]+\.)?booth\.pm(/|$)
      nicoVideo?: string | null; // uri ^https?://([\w-]+\.)?nicovideo\.jp(/|$)
      skeb?: string | null; // uri ^https?://([\w-]+\.)?skeb\.jp(/|$)
      fantia?: string | null; // uri ^https?://([\w-]+\.)?fantia\.jp(/|$)
      tumblr?: string | null; // uri ^https?://([\w-]+\.)?tumblr\.com(/|$)
      youtube?: string | null; // uri ^https?://www\.youtube\.com(/|$)
      weibo?: string | null; // uri ^https?://([\w-]+\.)?weibo\.(cn|com)(/|$)
      naver?: string | null; // uri ^https?://([\w-]+\.)?naver\.com(/|$)
      website?: string | null; // uri ^https?://
    }
    /**
     * AuthorEdit
     */
    export interface AuthorEdit {
      name?: string;
      biography?: /* LocalizedString */ LocalizedString;
      twitter?: string | null; // uri ^https?://twitter\.com(/|$)
      pixiv?: string | null; // uri ^https?://([\w-]+\.)?pixiv\.net(/|$)
      melonBook?: string | null; // uri ^https?://([\w-]+\.)?melonbooks\.co\.jp(/|$)
      fanBox?: string | null; // uri ^https?://([\w-]+\.)?fanbox\.cc(/|$)
      booth?: string | null; // uri ^https?://([\w-]+\.)?booth\.pm(/|$)
      nicoVideo?: string | null; // uri ^https?://([\w-]+\.)?nicovideo\.jp(/|$)
      skeb?: string | null; // uri ^https?://([\w-]+\.)?skeb\.jp(/|$)
      fantia?: string | null; // uri ^https?://([\w-]+\.)?fantia\.jp(/|$)
      tumblr?: string | null; // uri ^https?://([\w-]+\.)?tumblr\.com(/|$)
      youtube?: string | null; // uri ^https?://www\.youtube\.com(/|$)
      weibo?: string | null; // uri ^https?://([\w-]+\.)?weibo\.(cn|com)(/|$)
      naver?: string | null; // uri ^https?://([\w-]+\.)?naver\.com(/|$)
      website?: string | null; // uri ^https?://
      version: number;
    }
    /**
     * AuthorList
     */
    export interface AuthorList {
      result?: string;
      response?: string;
      data?: /* Author */ Author[];
      limit?: number;
      offset?: number;
      total?: number;
    }
    /**
     * AuthorResponse
     */
    export interface AuthorResponse {
      result?: string;
      response?: string;
      data?: /* Author */ Author;
    }
    /**
     * BeginEditSession
     */
    export interface BeginEditSession {
      version: number;
    }
    /**
     * BeginUploadSession
     */
    export interface BeginUploadSession {
      groups: [
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
      ];
      manga: string; // uuid
    }
    /**
     * Chapter
     */
    export interface Chapter {
      id?: string; // uuid
      type?: "chapter";
      attributes?: /* ChapterAttributes */ ChapterAttributes;
      relationships?: /* Relationship */ Relationship[];
    }
    /**
     * ChapterAttributes
     */
    export interface ChapterAttributes {
      title?: string | null;
      volume?: string | null;
      chapter?: string | null;
      /**
       * Count of readable images for this chapter
       */
      pages?: number;
      translatedLanguage?: string; // ^[a-z]{2}(-[a-z]{2})?$
      uploader?: string; // uuid
      /**
       * Denotes a chapter that links to an external source.
       */
      externalUrl?: string | null; // ^https?://
      version?: number;
      createdAt?: string;
      updatedAt?: string;
      publishAt?: string;
      readableAt?: string;
    }
    export interface ChapterDraft {
      volume: string | null; // ^((0|[1-9]\d*)(\.\d+)?[a-z]?)?$
      chapter: string | null; // ^((0|[1-9]\d*)(\.\d+)?[a-z]?)?$
      title: string | null;
      translatedLanguage: string; // ^[a-z]{2}(-[a-z]{2})?$
      externalUrl?: string | null; // ^https?://
      publishAt?: string; // ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
    }
    /**
     * ChapterRequest
     */
    export interface ChapterEdit {
      title?: string | null;
      volume?: string | null;
      chapter?: string | null;
      translatedLanguage?: string; // ^[a-z]{2}(-[a-z]{2})?$
      groups?: [
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
      ];
      version: number;
    }
    /**
     * ChapterList
     */
    export interface ChapterList {
      result?: string;
      response?: string;
      data?: /* Chapter */ Chapter[];
      limit?: number;
      offset?: number;
      total?: number;
    }
    /**
     * ChapterReadMarkersBatch
     */
    export type ChapterReadMarkerBatch =
      /* ChapterReadMarkersBatch */
      | {
          chapterIdsRead: string /* uuid */[];
          chapterIdsUnread?: string /* uuid */[];
        }
      | {
          chapterIdsRead?: string /* uuid */[];
          chapterIdsUnread: string /* uuid */[];
        };
    /**
     * ChapterRequest
     */
    export interface ChapterRequest {
      title?: string | null;
      volume?: string | null;
      chapter?: string | null;
      translatedLanguage?: string; // ^[a-z]{2}(-[a-z]{2})?$
      groups?: [
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
      ];
      version?: number;
    }
    /**
     * ChapterResponse
     */
    export interface ChapterResponse {
      result?: "ok" | "error";
      response?: string;
      data?: /* Chapter */ Chapter;
    }
    /**
     * CheckResponse
     *
     */
    export interface CheckResponse {
      result?: string;
      isAuthenticated?: boolean;
      roles?: string[];
      permissions?: string[];
    }
    /**
     * BeginUploadSession
     */
    export interface CommitUploadSession {
      chapterDraft?: ChapterDraft;
      /**
       * ordered list of Upload Session File ids
       */
      pageOrder?: [
        string,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
        string?,
      ];
    }
    /**
     * Cover
     */
    export interface Cover {
      id?: string; // uuid
      type?: "cover_art";
      attributes?: /* CoverAttributes */ CoverAttributes;
      relationships?: /* Relationship */ Relationship[];
    }
    /**
     * CoverAttributes
     */
    export interface CoverAttributes {
      volume?: string | null;
      fileName?: string;
      description?: string | null;
      locale?: string | null;
      version?: number;
      createdAt?: string;
      updatedAt?: string;
    }
    /**
     * CoverEdit
     */
    export interface CoverEdit {
      volume: string | null;
      description?: string | null;
      locale?: string | null; // ^[a-z]{2}(-[a-z]{2})?$
      version: number;
    }
    /**
     * CoverList
     */
    export interface CoverList {
      result?: string;
      response?: string;
      data?: /* Cover */ Cover[];
      limit?: number;
      offset?: number;
      total?: number;
    }
    /**
     * CoverResponse
     */
    export interface CoverResponse {
      result?: string;
      response?: string;
      data?: /* Cover */ Cover;
    }
    /**
     * CreateAccount
     */
    export interface CreateAccount {
      username: string;
      password: string;
      email: string; // email
    }
    /**
     * CreateScanlationGroup
     */
    export interface CreateScanlationGroup {
      name: string;
      website?: string | null;
      ircServer?: string | null;
      ircChannel?: string | null;
      discord?: string | null;
      contactEmail?: string | null;
      description?: string | null;
      twitter?: string | null; // uri ^https?://twitter\.com
      mangaUpdates?: string | null; // ^https:\/\/www\.mangaupdates\.com\/(group|publisher)(s\.html\?id=\d+|\/[\w-]+\/?([\w-]+)?(\/)?)$
      inactive?: boolean;
      publishDelay?: string | null; // ^P(([1-9]|[1-9][0-9])D)?(([1-9])W)?(T(([1-9]|1[0-9]|2[0-4])H)?(([1-9]|[1-5][0-9]|60)M)?(([1-9]|[1-5][0-9]|60)S)?)?$
    }
    /**
     * CustomList
     */
    export interface CustomList {
      id?: string; // uuid
      type?: "custom_list";
      attributes?: /* CustomListAttributes */ CustomListAttributes;
      relationships?: /* Relationship */ Relationship[];
    }
    /**
     * CustomListAttributes
     */
    export interface CustomListAttributes {
      name?: string;
      visibility?: "private" | "public";
      version?: number;
    }
    /**
     * CustomListCreate
     */
    export interface CustomListCreate {
      name: string;
      visibility?: "public" | "private";
      manga?: string /* uuid */[];
      version?: number;
    }
    /**
     * CustomListEdit
     */
    export interface CustomListEdit {
      name?: string;
      visibility?: "public" | "private";
      manga?: string /* uuid */[];
      version: number;
    }
    /**
     * CustomListList
     */
    export interface CustomListList {
      result?: string;
      response?: string;
      data?: /* CustomList */ CustomList[];
      limit?: number;
      offset?: number;
      total?: number;
    }
    /**
     * CustomListResponse
     */
    export interface CustomListResponse {
      result?: "ok" | "error";
      response?: string;
      data?: /* CustomList */ CustomList;
    }
    /**
     * Error
     */
    export interface Error {
      id?: string;
      status?: number;
      title?: string;
      detail?: string | null;
      context?: string | null;
    }
    /**
     * ErrorResponse
     */
    export interface ErrorResponse {
      result?: string;
      errors?: /* Error */ Error[];
    }
    /**
     * ForumsThreadResponse
     */
    export interface ForumsThreadResponse {
      result?: string;
      response?: string;
      data?: {
        type?: string;
        /**
         * The id for the thread on the forums, accessible at `https://forums.mangadex.org/threads/:id`
         */
        id?: number;
        attributes?: {
          /**
           * The number of replies so far in the forums thread returned
           */
          repliesCount?: number;
        };
      };
    }
    /**
     * LocalizedString
     */
    export type LocalizedString = Record<string, string>;
    /**
     * Login
     */
    export interface Login {
      username?: string;
      email?: string;
      password: string;
    }
    /**
     * LoginResponse
     */
    export interface LoginResponse {
      result?: "ok" | "error";
      token?: {
        session?: string;
        refresh?: string;
      };
    }
    /**
     * LogoutResponse
     */
    export interface LogoutResponse {
      result?: "ok" | "error";
    }
    /**
     * Manga
     */
    export interface Manga {
      id?: string; // uuid
      type?: "manga";
      attributes?: /* MangaAttributes */ MangaAttributes;
      relationships?: /* Relationship */ Relationship[];
    }
    /**
     * MangaAttributes
     */
    export interface MangaAttributes {
      title?: /* LocalizedString */ LocalizedString;
      altTitles?: /* LocalizedString */ LocalizedString[];
      description?: /* LocalizedString */ LocalizedString;
      isLocked?: boolean;
      links?: Record<string, string>;
      originalLanguage?: string;
      lastVolume?: string | null;
      lastChapter?: string | null;
      publicationDemographic?: "shounen" | "shoujo" | "josei" | "seinen";
      status?: "completed" | "ongoing" | "cancelled" | "hiatus";
      /**
       * Year of release
       */
      year?: number | null;
      contentRating?: "safe" | "suggestive" | "erotica" | "pornographic";
      chapterNumbersResetOnNewVolume?: boolean;
      availableTranslatedLanguages?: string /* ^[a-z]{2}(-[a-z]{2})?$ */[];
      latestUploadedChapter?: string; // uuid
      tags?: /* Tag */ Tag[];
      state?: "draft" | "submitted" | "published" | "rejected";
      version?: number;
      createdAt?: string;
      updatedAt?: string;
    }
    /**
     * MangaRequest
     *
     */
    export interface MangaCreate {
      title: /* LocalizedString */ LocalizedString;
      altTitles?: /* LocalizedString */ LocalizedString[];
      description?: /* LocalizedString */ LocalizedString;
      authors?: string /* uuid */[];
      artists?: string /* uuid */[];
      links?: Record<string, string>;
      originalLanguage: string; // ^[a-z]{2}(-[a-z]{2})?$
      lastVolume?: string | null;
      lastChapter?: string | null;
      publicationDemographic?: "shounen" | "shoujo" | "josei" | "seinen";
      status: "completed" | "ongoing" | "cancelled" | "hiatus";
      /**
       * Year of release
       */
      year?: number | null;
      contentRating: "safe" | "suggestive" | "erotica" | "pornographic";
      chapterNumbersResetOnNewVolume?: boolean;
      tags?: string /* uuid */[];
      primaryCover?: string | null; // uuid
      version?: number;
    }
    /**
     * MangaRequest
     *
     */
    export interface MangaEdit {
      title?: /* LocalizedString */ LocalizedString;
      altTitles?: /* LocalizedString */ LocalizedString[];
      description?: /* LocalizedString */ LocalizedString;
      authors?: string /* uuid */[];
      artists?: string /* uuid */[];
      links?: Record<string, string>;
      originalLanguage?: string; // ^[a-z]{2}(-[a-z]{2})?$
      lastVolume?: string | null;
      lastChapter?: string | null;
      publicationDemographic?: "shounen" | "shoujo" | "josei" | "seinen";
      status?: "completed" | "ongoing" | "cancelled" | "hiatus";
      /**
       * Year of release
       */
      year?: number | null;
      contentRating?: "safe" | "suggestive" | "erotica" | "pornographic";
      chapterNumbersResetOnNewVolume?: boolean;
      tags?: string /* uuid */[];
      primaryCover?: string | null; // uuid
      version: number;
    }
    /**
     * MangaList
     */
    export interface MangaList {
      result?: string;
      response?: string;
      data?: /* Manga */ Manga[];
      limit?: number;
      offset?: number;
      total?: number;
    }
    /**
     * MangaRelation
     */
    export interface MangaRelation {
      id?: string; // uuid
      type?: "manga_relation";
      attributes?: /* MangaRelationAttributes */ MangaRelationAttributes;
      relationships?: /* Relationship */ Relationship[];
    }
    /**
     * MangaRelationAttributes
     */
    export interface MangaRelationAttributes {
      relation?:
        | "monochrome"
        | "main_story"
        | "adapted_from"
        | "based_on"
        | "prequel"
        | "side_story"
        | "doujinshi"
        | "same_franchise"
        | "shared_universe"
        | "sequel"
        | "spin_off"
        | "alternate_story"
        | "alternate_version"
        | "preserialization"
        | "colored"
        | "serialization";
      version?: number;
    }
    /**
     * MangaRelationRequest
     *
     */
    export interface MangaRelationCreate {
      targetManga: string; // uuid
      relation:
        | "monochrome"
        | "main_story"
        | "adapted_from"
        | "based_on"
        | "prequel"
        | "side_story"
        | "doujinshi"
        | "same_franchise"
        | "shared_universe"
        | "sequel"
        | "spin_off"
        | "alternate_story"
        | "alternate_version"
        | "preserialization"
        | "colored"
        | "serialization";
    }
    /**
     * MangaRelationList
     */
    export interface MangaRelationList {
      result?: string;
      response?: string;
      data?: /* MangaRelation */ MangaRelation[];
      limit?: number;
      offset?: number;
      total?: number;
    }
    /**
     * MangaRelationRequest
     *
     */
    export interface MangaRelationRequest {
      targetManga?: string; // uuid
      relation?:
        | "monochrome"
        | "main_story"
        | "adapted_from"
        | "based_on"
        | "prequel"
        | "side_story"
        | "doujinshi"
        | "same_franchise"
        | "shared_universe"
        | "sequel"
        | "spin_off"
        | "alternate_story"
        | "alternate_version"
        | "preserialization"
        | "colored"
        | "serialization";
    }
    /**
     * MangaRelationResponse
     */
    export interface MangaRelationResponse {
      result?: "ok" | "error";
      response?: string;
      data?: /* MangaRelation */ MangaRelation;
    }
    /**
     * MangaRequest
     *
     */
    export interface MangaRequest {
      title?: /* LocalizedString */ LocalizedString;
      altTitles?: /* LocalizedString */ LocalizedString[];
      description?: /* LocalizedString */ LocalizedString;
      authors?: string /* uuid */[];
      artists?: string /* uuid */[];
      links?: Record<string, string>;
      originalLanguage?: string; // ^[a-z]{2}(-[a-z]{2})?$
      lastVolume?: string | null;
      lastChapter?: string | null;
      publicationDemographic?: "shounen" | "shoujo" | "josei" | "seinen";
      status?: "completed" | "ongoing" | "cancelled" | "hiatus";
      /**
       * Year of release
       */
      year?: number | null;
      contentRating?: "safe" | "suggestive" | "erotica" | "pornographic";
      chapterNumbersResetOnNewVolume?: boolean;
      tags?: string /* uuid */[];
      primaryCover?: string | null; // uuid
      version?: number;
    }
    /**
     * MangaResponse
     */
    export interface MangaResponse {
      result?: "ok" | "error";
      response?: string;
      data?: /* Manga */ Manga;
    }
    /**
     * MappingId
     */
    export interface MappingId {
      id?: string; // uuid
      type?: "mapping_id";
      attributes?: /* MappingIdAttributes */ MappingIdAttributes;
      relationships?: /* Relationship */ Relationship[];
    }
    /**
     * MappingIdAttributes
     */
    export interface MappingIdAttributes {
      type?: "manga" | "chapter" | "group" | "tag";
      legacyId?: number;
      newId?: string; // uuid
    }
    /**
     * MappingIdBody
     */
    export interface MappingIdBody {
      type?: "group" | "manga" | "chapter" | "tag";
      ids?: number[];
    }
    /**
     * MappingIdResponse
     */
    export interface MappingIdResponse {
      result?: string;
      response?: string;
      data?: /* MappingId */ MappingId[];
      limit?: number;
      offset?: number;
      total?: number;
    }
    /**
     * RecoverCompleteBody
     */
    export interface RecoverCompleteBody {
      newPassword: string;
    }
    /**
     * ReferenceExpansionApiClient
     * Reference expansion options for api_client entities or lists
     */
    export type ReferenceExpansionApiClient = Array<"creator">;
    /**
     * ReferenceExpansionAuthor
     * Reference expansion options for author/artist entities or lists
     */
    export type ReferenceExpansionAuthor = Array<"manga">;
    /**
     * ReferenceExpansionChapter
     * Reference expansion options for chapter entities or lists
     */
    export type ReferenceExpansionChapter = Array<
      "manga" | "scanlation_group" | "user"
    >;
    /**
     * ReferenceExpansionCoverArt
     * Reference expansion options for cover art entities or lists
     */
    export type ReferenceExpansionCoverArt = Array<"manga" | "user">;
    /**
     * ReferenceExpansionManga
     * Reference expansion options for manga entities or lists
     */
    export type ReferenceExpansionManga = Array<
      "manga" | "cover_art" | "author" | "artist" | "tag" | "creator"
    >;
    /**
     * ReferenceExpansionMangaRelation
     * Reference expansion options for manga relation entities or lists
     */
    export type ReferenceExpansionMangaRelation = Array<"manga">;
    /**
     * ReferenceExpansionReport
     * Reference expansion options for user report entities or lists
     */
    export type ReferenceExpansionReport = Array<"user" | "reason">;
    /**
     * ReferenceExpansionScanlationGroup
     * Reference expansion options for scanlation group entities or lists
     */
    export type ReferenceExpansionScanlationGroup = Array<"leader" | "member">;
    /**
     * RefreshResponse
     */
    export interface RefreshResponse {
      result: "ok" | "error";
      token?: {
        session?: string;
        refresh?: string;
      };
      message?: string;
    }
    /**
     * RefreshToken
     */
    export interface RefreshToken {
      token: string;
    }
    /**
     * Relationship
     */
    export interface Relationship {
      id?: string; // uuid
      type?: string;
      /**
       * Related Manga type, only present if you are on a Manga entity and a Manga relationship
       */
      related?:
        | "monochrome"
        | "main_story"
        | "adapted_from"
        | "based_on"
        | "prequel"
        | "side_story"
        | "doujinshi"
        | "same_franchise"
        | "shared_universe"
        | "sequel"
        | "spin_off"
        | "alternate_story"
        | "alternate_version"
        | "preserialization"
        | "colored"
        | "serialization";
      /**
       * If Reference Expansion is applied, contains objects attributes
       */
      attributes?: Record<string, any> | null;
    }
    /**
     * Report
     */
    export interface Report {
      id?: string; // uuid
      type?: "report";
      attributes?: /* ReportAttributes */ ReportAttributes;
      relationships?: /* Relationship */ Relationship[];
    }
    /**
     * ReportAttributes
     */
    export interface ReportAttributes {
      details?: string;
      objectId?: string;
      status?: "waiting" | "accepted" | "refused" | "autoresolved";
      createdAt?: string;
    }
    /**
     * ReportListResponse
     */
    export interface ReportListResponse {
      result?: "ok" | "error";
      response?: string;
      data?: /* Report */ Report[];
      limit?: number;
      offset?: number;
      total?: number;
    }
    /**
     * Response
     */
    export interface Response {
      result?: "ok" | "error";
    }
    /**
     * ScanlationGroup
     */
    export interface ScanlationGroup {
      id?: string; // uuid
      type?: "scanlation_group";
      attributes?: /* ScanlationGroupAttributes */ ScanlationGroupAttributes;
      relationships?: /* Relationship */ Relationship[];
    }
    /**
     * ScanlationGroupAttributes
     */
    export interface ScanlationGroupAttributes {
      name?: string;
      altNames?: /* LocalizedString */ LocalizedString[];
      website?: string | null;
      ircServer?: string | null;
      ircChannel?: string | null;
      discord?: string | null;
      contactEmail?: string | null;
      description?: string | null;
      twitter?: string | null; // uri ^https?://
      mangaUpdates?: string | null; // uri ^https:\/\/www\.mangaupdates\.com\/(group|publisher)(s\.html\?id=\d+|\/[\w-]+\/?([\w-]+)?(\/)?)$
      focusedLanguage?: string /* ^[a-z]{2}(-[a-z]{2})?$ */[] | null;
      locked?: boolean;
      official?: boolean;
      verified?: boolean;
      inactive?: boolean;
      exLicensed?: boolean;
      /**
       * Should respected ISO 8601 duration specification: https://en.wikipedia.org/wiki/ISO_8601#Durations
       * example:
       * P4D
       */
      publishDelay?: string; // ^(P([1-9]|[1-9][0-9])D)?(P?([1-9])W)?(P?T(([1-9]|1[0-9]|2[0-4])H)?(([1-9]|[1-5][0-9]|60)M)?(([1-9]|[1-5][0-9]|60)S)?)?$
      version?: number;
      createdAt?: string;
      updatedAt?: string;
    }
    /**
     * ScanlationGroupEdit
     */
    export interface ScanlationGroupEdit {
      name?: string;
      leader?: string; // uuid
      members?: string /* uuid */[];
      website?: string | null;
      ircServer?: string | null;
      ircChannel?: string | null;
      discord?: string | null;
      contactEmail?: string | null;
      description?: string | null;
      twitter?: string | null; // uri ^https?://
      mangaUpdates?: string | null; // uri ^https:\/\/www\.mangaupdates\.com\/(group|publisher)(s\.html\?id=\d+|\/[\w-]+\/?([\w-]+)?(\/)?)$
      focusedLanguages?: string /* ^[a-z]{2}(-[a-z]{2})?$ */[] | null;
      inactive?: boolean;
      locked?: boolean;
      publishDelay?: string;
      version: number;
    }
    /**
     * ScanlationGroupList
     */
    export interface ScanlationGroupList {
      result?: string;
      response?: string;
      data?: /* ScanlationGroup */ ScanlationGroup[];
      limit?: number;
      offset?: number;
      total?: number;
    }
    /**
     * ScanlationGroupResponse
     */
    export interface ScanlationGroupResponse {
      result?: "ok";
      response?: string;
      data?: /* ScanlationGroup */ ScanlationGroup;
    }
    /**
     * SendAccountActivationCode
     */
    export interface SendAccountActivationCode {
      email: string; // email
    }
    /**
     * StatisticsDetailsComments
     * Comments-related statistics of an entity.
     * If it is `null`, the entity doesn't have a backing comments thread, and therefore has no comments yet.
     *
     */
    export type StatisticsDetailsComments = {
      /**
       * The id of the thread backing the comments for that entity on the MangaDex Forums.
       */
      threadId?: number;
      /**
       * The number of replies on the MangaDex Forums thread backing this entity's comments. This excludes the initial comment that opens the thread, which is created by our systems.
       *
       */
      repliesCount?: number;
    } | null;
    /**
     * Tag
     */
    export interface Tag {
      id?: string; // uuid
      type?: "tag";
      attributes?: /* TagAttributes */ TagAttributes;
      relationships?: /* Relationship */ Relationship[];
    }
    /**
     * TagAttributes
     */
    export interface TagAttributes {
      name?: /* LocalizedString */ LocalizedString;
      description?: /* LocalizedString */ LocalizedString;
      group?: "content" | "format" | "genre" | "theme";
      version?: number;
    }
    /**
     * TagResponse
     */
    export interface TagResponse {
      result?: string;
      response?: string;
      data?: /* Tag */ Tag[];
      limit?: number;
      offset?: number;
      total?: number;
    }
    /**
     * UpdateMangaStatus
     */
    export interface UpdateMangaStatus {
      status:
        | "reading"
        | "on_hold"
        | "plan_to_read"
        | "dropped"
        | "re_reading"
        | "completed";
    }
    /**
     * UploadSession
     */
    export interface UploadSession {
      id?: string; // uuid
      type?: "upload_session";
      attributes?: /* UploadSessionAttributes */ UploadSessionAttributes;
    }
    /**
     * UploadSessionAttributes
     */
    export interface UploadSessionAttributes {
      isCommitted?: boolean;
      isProcessed?: boolean;
      isDeleted?: boolean;
      version?: number;
      createdAt?: string;
      updatedAt?: string;
    }
    /**
     * UploadSessionFile
     */
    export interface UploadSessionFile {
      id?: string; // uuid
      type?: "upload_session_file";
      attributes?: /* UploadSessionFileAttributes */ UploadSessionFileAttributes;
    }
    /**
     * UploadSessionFileAttributes
     */
    export interface UploadSessionFileAttributes {
      originalFileName?: string;
      fileHash?: string;
      fileSize?: number;
      mimeType?: string;
      source?: "local" | "remote";
      version?: number;
    }
    /**
     * User
     */
    export interface User {
      id?: string; // uuid
      type?: "user";
      attributes?: /* UserAttributes */ UserAttributes;
      relationships?: /* Relationship */ Relationship[];
    }
    /**
     * UserAttributes
     */
    export interface UserAttributes {
      username?: string;
      roles?: string[];
      version?: number;
    }
    /**
     * UserList
     */
    export interface UserList {
      result?: string;
      response?: string;
      data?: /* User */ User[];
      limit?: number;
      offset?: number;
      total?: number;
    }
    /**
     * UserResponse
     */
    export interface UserResponse {
      result?: "ok";
      response?: string;
      data?: /* User */ User;
    }
  }
}
declare namespace Paths {
  namespace AbandonUploadSession {
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
    }
  }
  namespace AtHomeServer$ChapterId {
    namespace Parameters {
      export type ChapterId = string; // uuid
    }
    export interface PathParameters {
      chapterId: Parameters.ChapterId /* uuid */;
    }
  }
  namespace Author$Id {
    namespace Parameters {
      export type Id = string; // uuid
    }
    export interface PathParameters {
      id: Parameters.Id /* uuid */;
    }
  }
  namespace BeginEditSession {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export type RequestBody =
      /* BeginEditSession */ Components.Schemas.BeginEditSession;
    namespace Responses {
      export type $200 = /* UploadSession */ Components.Schemas.UploadSession;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $401 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace BeginUploadSession {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export type RequestBody =
      /* BeginUploadSession */ Components.Schemas.BeginUploadSession;
    namespace Responses {
      export type $200 = /* UploadSession */ Components.Schemas.UploadSession;
    }
  }
  namespace Chapter$Id {
    namespace Parameters {
      export type Id = string; // uuid
    }
    export interface PathParameters {
      id: Parameters.Id /* uuid */;
    }
  }
  namespace Client$Id {
    namespace Parameters {
      export type Id = string; // uuid
    }
    export interface PathParameters {
      id: Parameters.Id /* uuid */;
    }
  }
  namespace Client$IdSecret {
    namespace Parameters {
      export type Id = string; // uuid
    }
    export interface PathParameters {
      id: Parameters.Id /* uuid */;
    }
  }
  namespace CommitMangaDraft {
    export interface RequestBody {
      version?: number;
    }
    namespace Responses {
      export type $201 = /* MangaResponse */ Components.Schemas.MangaResponse;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace CommitUploadSession {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export type RequestBody =
      /* BeginUploadSession */ Components.Schemas.CommitUploadSession;
    namespace Responses {
      export type $200 = /* Chapter */ Components.Schemas.Chapter;
    }
  }
  namespace Cover$MangaOrCoverId {
    namespace Parameters {
      export type MangaOrCoverId = string; // uuid
    }
    export interface PathParameters {
      mangaOrCoverId: Parameters.MangaOrCoverId /* uuid */;
    }
  }
  namespace DeleteApiclient {
    namespace Parameters {
      export type Version = string; // ^\d+$
    }
    export interface QueryParameters {
      version?: Parameters.Version /* ^\d+$ */;
    }
    namespace Responses {
      export interface $200 {
        result?: string;
      }
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace DeleteAuthorId {
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace DeleteChapterId {
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace DeleteCover {
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace DeleteGroupId {
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace DeleteGroupIdFollow {
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace DeleteListId {
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace DeleteMangaId {
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace DeleteMangaIdFollow {
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace DeleteMangaIdListListId {
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace DeleteMangaRelationId {
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace DeleteRatingMangaId {
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace DeleteUploadedSessionFile {
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
    }
  }
  namespace DeleteUploadedSessionFiles {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export type RequestBody = string /* uuid */[];
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
    }
  }
  namespace DeleteUserId {
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
    }
  }
  namespace EditCover {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export type RequestBody = /* CoverEdit */ Components.Schemas.CoverEdit;
    namespace Responses {
      export type $200 = /* CoverResponse */ Components.Schemas.CoverResponse;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace FollowListId {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export interface RequestBody {}
    namespace Responses {
      export interface $200 {
        result?: "ok";
      }
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace ForumsThreadCreate {
    export interface RequestBody {
      /**
       * The type of the resource
       */
      type?: "manga" | "group" | "chapter";
      /**
       * The id of the resource
       */
      id?: string; // uuid
    }
    namespace Responses {
      export type $200 =
        /* ForumsThreadResponse */ Components.Schemas.ForumsThreadResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetApiclient {
    namespace Parameters {
      export type Includes =
        /**
         * ReferenceExpansionApiClient
         * Reference expansion options for api_client entities or lists
         */
        Components.Schemas.ReferenceExpansionApiClient;
    }
    export interface QueryParameters {
      "includes[]"?: Parameters.Includes;
    }
    namespace Responses {
      export type $200 =
        /* ApiClientResponse */ Components.Schemas.ApiClientResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetApiclientSecret {
    namespace Responses {
      export interface $200 {
        result?: "ok";
        data?: string;
      }
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetAtHomeServerChapterId {
    namespace Parameters {
      export type ForcePort443 = boolean;
    }
    export interface QueryParameters {
      forcePort443?: Parameters.ForcePort443;
    }
    namespace Responses {
      /**
       * example:
       * {
       *   "result": "ok",
       *   "baseUrl": "https://abcdef.xyz123.mangadex.network:12345/some-temporary-access-token",
       *   "chapter": {
       *     "hash": "d9786b687bc5f3fe1d4ae05ff05e0eb5",
       *     "data": [
       *       "x1-b765e86d5ecbc932cf3f517a8604f6ac6d8a7f379b0277a117dc7c09c53d041e.png",
       *       "x2-fc7c198880083b053bf4e8aebfc0eec1adbe52878a6c5ff08d25544a1d5502ef.png",
       *       "x3-90f15bc8b91deb0dc88473b532e42a99f93ee9e2c8073795c81b01fff428af80.png"
       *     ],
       *     "dataSaver": [
       *       "x1-ab2b7c8f30c843aa3a53c29bc8c0e204fba4ab3e75985d761921eb6a52ff6159.jpg",
       *       "x2-3e057d937e01696adce2ac2865f62f6f6a15f03cef43d929b88e99a4b8482e03.jpg",
       *       "x3-128742088f99806b022bbc8006554456f2a20d0d176d7f3264a65ff9a549d0dd.jpg"
       *     ]
       *   }
       * }
       */
      export interface $200 {
        result?: string;
        /**
         * The base URL to construct final image URLs from.
         * The URL returned is valid for the requested chapter only, and for a duration of 15 minutes from the time of the response.
         */
        baseUrl?: string;
        chapter?: {
          hash?: string;
          data?: string[];
          dataSaver?: string[];
        };
      }
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetAuthCheck {
    namespace Responses {
      export type $200 =
        /**
         * CheckResponse
         *
         */
        Components.Schemas.CheckResponse;
    }
  }
  namespace GetAuthor {
    namespace Parameters {
      export type Ids = string /* uuid */[];
      export type Includes =
        /**
         * ReferenceExpansionAuthor
         * Reference expansion options for author/artist entities or lists
         */
        Components.Schemas.ReferenceExpansionAuthor;
      export type Limit = number;
      export type Name = string;
      export type Offset = number;
      export interface Order {
        name?: "asc" | "desc";
      }
    }
    export interface QueryParameters {
      limit?: Parameters.Limit;
      offset?: Parameters.Offset;
      "ids[]"?: Parameters.Ids;
      name?: Parameters.Name;
      order?: Parameters.Order;
      "includes[]"?: Parameters.Includes;
    }
    namespace Responses {
      export type $200 = /* AuthorList */ Components.Schemas.AuthorList;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetAuthorId {
    namespace Parameters {
      export type Includes =
        /**
         * ReferenceExpansionAuthor
         * Reference expansion options for author/artist entities or lists
         */
        Components.Schemas.ReferenceExpansionAuthor;
    }
    export interface QueryParameters {
      "includes[]"?: Parameters.Includes;
    }
    namespace Responses {
      export type $200 = /* AuthorResponse */ Components.Schemas.AuthorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetChapter {
    namespace Parameters {
      export type Chapter = string | string[];
      export type ContentRating = Array<
        "safe" | "suggestive" | "erotica" | "pornographic"
      >;
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
       */
      export type CreatedAtSince = string; // ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
      export type ExcludedGroups = string /* uuid */[];
      export type ExcludedOriginalLanguage = string /* ^[a-zA-Z\-]{2,5}$ */[];
      export type ExcludedUploaders = string /* uuid */[];
      export type Groups = string /* uuid */[];
      export type Ids = string /* uuid */[];
      export type IncludeEmptyPages = 0 | 1;
      export type IncludeExternalUrl = 0 | 1;
      export type IncludeFuturePublishAt = 0 | 1;
      export type IncludeFutureUpdates = "0" | "1";
      export type Includes = Array<"manga" | "scanlation_group" | "user">;
      export type Limit = number;
      export type Manga = string; // uuid
      export type Offset = number;
      export interface Order {
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
        publishAt?: "asc" | "desc";
        readableAt?: "asc" | "desc";
        volume?: "asc" | "desc";
        chapter?: "asc" | "desc";
      }
      export type OriginalLanguage = string /* ^[a-zA-Z\-]{2,5}$ */[];
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
       */
      export type PublishAtSince = string; // ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
      export type Title = string;
      export type TranslatedLanguage = string /* ^[a-zA-Z\-]{2,5}$ */[];
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
       */
      export type UpdatedAtSince = string; // ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
      export type Uploader = string /* uuid */ | string /* uuid */[];
      export type Volume = string | string[];
    }
    export interface QueryParameters {
      limit?: Parameters.Limit;
      offset?: Parameters.Offset;
      "ids[]"?: Parameters.Ids;
      title?: Parameters.Title;
      "groups[]"?: Parameters.Groups;
      uploader?: Parameters.Uploader;
      manga?: Parameters.Manga /* uuid */;
      "volume[]"?: Parameters.Volume;
      chapter?: Parameters.Chapter;
      "translatedLanguage[]"?: Parameters.TranslatedLanguage;
      "originalLanguage[]"?: Parameters.OriginalLanguage;
      "excludedOriginalLanguage[]"?: Parameters.ExcludedOriginalLanguage;
      "contentRating[]"?: Parameters.ContentRating;
      "excludedGroups[]"?: Parameters.ExcludedGroups;
      "excludedUploaders[]"?: Parameters.ExcludedUploaders;
      includeFutureUpdates?: Parameters.IncludeFutureUpdates;
      includeEmptyPages?: Parameters.IncludeEmptyPages;
      includeFuturePublishAt?: Parameters.IncludeFuturePublishAt;
      includeExternalUrl?: Parameters.IncludeExternalUrl;
      createdAtSince?: /* DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0 */ Parameters.CreatedAtSince /* ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$ */;
      updatedAtSince?: /* DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0 */ Parameters.UpdatedAtSince /* ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$ */;
      publishAtSince?: /* DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0 */ Parameters.PublishAtSince /* ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$ */;
      order?: Parameters.Order;
      includes?: Parameters.Includes;
    }
    namespace Responses {
      export type $200 = /* ChapterList */ Components.Schemas.ChapterList;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetChapterId {
    namespace Parameters {
      export type Includes =
        /**
         * ReferenceExpansionChapter
         * Reference expansion options for chapter entities or lists
         */
        Components.Schemas.ReferenceExpansionChapter;
    }
    export interface QueryParameters {
      "includes[]"?: Parameters.Includes;
    }
    namespace Responses {
      export type $200 =
        /* ChapterResponse */ Components.Schemas.ChapterResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetCover {
    namespace Parameters {
      export type Ids = string /* uuid */[];
      export type Includes =
        /**
         * ReferenceExpansionCoverArt
         * Reference expansion options for cover art entities or lists
         */
        Components.Schemas.ReferenceExpansionCoverArt;
      export type Limit = number;
      export type Locales = string /* ^[a-z]{2}(-[a-z]{2})?$ */[];
      export type Manga = string /* uuid */[];
      export type Offset = number;
      export interface Order {
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
        volume?: "asc" | "desc";
      }
      export type Uploaders = string /* uuid */[];
    }
    export interface QueryParameters {
      limit?: Parameters.Limit;
      offset?: Parameters.Offset;
      "manga[]"?: Parameters.Manga;
      "ids[]"?: Parameters.Ids;
      "uploaders[]"?: Parameters.Uploaders;
      "locales[]"?: Parameters.Locales;
      order?: Parameters.Order;
      "includes[]"?: Parameters.Includes;
    }
    namespace Responses {
      export type $200 = /* CoverList */ Components.Schemas.CoverList;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetCoverId {
    namespace Parameters {
      export type Includes =
        /**
         * ReferenceExpansionCoverArt
         * Reference expansion options for cover art entities or lists
         */
        Components.Schemas.ReferenceExpansionCoverArt;
    }
    export interface QueryParameters {
      "includes[]"?: Parameters.Includes;
    }
    namespace Responses {
      export type $200 = /* CoverResponse */ Components.Schemas.CoverResponse;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetGroupId {
    namespace Parameters {
      export type Includes =
        /**
         * ReferenceExpansionScanlationGroup
         * Reference expansion options for scanlation group entities or lists
         */
        Components.Schemas.ReferenceExpansionScanlationGroup;
    }
    export interface QueryParameters {
      "includes[]"?: Parameters.Includes;
    }
    namespace Responses {
      export type $200 =
        /* ScanlationGroupResponse */ Components.Schemas.ScanlationGroupResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetListApiclients {
    namespace Parameters {
      export type Includes =
        /**
         * ReferenceExpansionApiClient
         * Reference expansion options for api_client entities or lists
         */
        Components.Schemas.ReferenceExpansionApiClient;
      export type Limit = number;
      export type Name = string;
      export type Offset = number;
      export interface Order {
        name?: "asc" | "desc";
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
      }
      export type State =
        | "requested"
        | "approved"
        | "rejected"
        | "autoapproved";
    }
    export interface QueryParameters {
      limit?: Parameters.Limit;
      offset?: Parameters.Offset;
      state?: Parameters.State;
      name?: Parameters.Name;
      "includes[]"?: Parameters.Includes;
      order?: Parameters.Order;
    }
    namespace Responses {
      export type $200 = /* ApiClientList */ Components.Schemas.ApiClientList;
    }
  }
  namespace GetListId {
    namespace Responses {
      export type $200 =
        /* CustomListResponse */ Components.Schemas.CustomListResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetListIdFeed {
    namespace Parameters {
      export type ContentRating = Array<
        "safe" | "suggestive" | "erotica" | "pornographic"
      >;
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
       */
      export type CreatedAtSince = string; // ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
      export type ExcludedGroups = string /* uuid */[];
      export type ExcludedOriginalLanguage = string /* ^[a-zA-Z\-]{2,5}$ */[];
      export type ExcludedUploaders = string /* uuid */[];
      export type IncludeEmptyPages = 0 | 1;
      export type IncludeExternalUrl = 0 | 1;
      export type IncludeFuturePublishAt = 0 | 1;
      export type IncludeFutureUpdates = "0" | "1";
      export type Includes =
        /**
         * ReferenceExpansionChapter
         * Reference expansion options for chapter entities or lists
         */
        Components.Schemas.ReferenceExpansionChapter;
      export type Limit = number;
      export type Offset = number;
      export interface Order {
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
        publishAt?: "asc" | "desc";
        readableAt?: "asc" | "desc";
        volume?: "asc" | "desc";
        chapter?: "asc" | "desc";
      }
      export type OriginalLanguage = string /* ^[a-zA-Z\-]{2,5}$ */[];
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
       */
      export type PublishAtSince = string; // ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
      export type TranslatedLanguage = string /* ^[a-zA-Z\-]{2,5}$ */[];
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
       */
      export type UpdatedAtSince = string; // ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
    }
    export interface QueryParameters {
      limit?: Parameters.Limit;
      offset?: Parameters.Offset;
      "translatedLanguage[]"?: Parameters.TranslatedLanguage;
      "originalLanguage[]"?: Parameters.OriginalLanguage;
      "excludedOriginalLanguage[]"?: Parameters.ExcludedOriginalLanguage;
      "contentRating[]"?: Parameters.ContentRating;
      "excludedGroups[]"?: Parameters.ExcludedGroups;
      "excludedUploaders[]"?: Parameters.ExcludedUploaders;
      includeFutureUpdates?: Parameters.IncludeFutureUpdates;
      createdAtSince?: /* DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0 */ Parameters.CreatedAtSince /* ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$ */;
      updatedAtSince?: /* DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0 */ Parameters.UpdatedAtSince /* ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$ */;
      publishAtSince?: /* DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0 */ Parameters.PublishAtSince /* ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$ */;
      order?: Parameters.Order;
      "includes[]"?: Parameters.Includes;
      includeEmptyPages?: Parameters.IncludeEmptyPages;
      includeFuturePublishAt?: Parameters.IncludeFuturePublishAt;
      includeExternalUrl?: Parameters.IncludeExternalUrl;
    }
    namespace Responses {
      export type $200 = /* ChapterList */ Components.Schemas.ChapterList;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $401 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetMangaAggregate {
    namespace Parameters {
      export type Groups = string /* uuid */[];
      export type TranslatedLanguage = string /* ^[a-zA-Z\-]{2,5}$ */[];
    }
    export interface QueryParameters {
      "translatedLanguage[]"?: Parameters.TranslatedLanguage;
      "groups[]"?: Parameters.Groups;
    }
    namespace Responses {
      export interface $200 {
        result?: string;
        volumes?: Record<
          string,
          {
            volume?: string;
            count?: number;
            chapters?: Record<
              string,
              {
                chapter?: string;
                id?: string; // uuid
                others?: string /* uuid */[];
                count?: number;
              }
            >;
          }
        >;
      }
    }
  }
  namespace GetMangaChapterReadmarkers {
    namespace Responses {
      export interface $200 {
        result?: "ok";
        data?: string /* uuid */[];
      }
    }
  }
  namespace GetMangaChapterReadmarkers2 {
    namespace Parameters {
      export type Grouped = boolean;
      export type Ids = string /* uuid */[];
    }
    export interface QueryParameters {
      "ids[]": Parameters.Ids;
      grouped?: Parameters.Grouped;
    }
    namespace Responses {
      export interface $200 {
        result?: "ok";
        data?: string /* uuid */[] | Record<string, string /* uuid */[]>;
      }
    }
  }
  namespace GetMangaDrafts {
    namespace Responses {
      export type $200 = /* MangaResponse */ Components.Schemas.MangaResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetMangaId {
    namespace Parameters {
      export type Includes =
        /**
         * ReferenceExpansionManga
         * Reference expansion options for manga entities or lists
         */
        Components.Schemas.ReferenceExpansionManga;
    }
    export interface QueryParameters {
      "includes[]"?: Parameters.Includes;
    }
    namespace Responses {
      export type $200 = /* MangaResponse */ Components.Schemas.MangaResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetMangaIdDraft {
    namespace Responses {
      export type $200 = /* MangaResponse */ Components.Schemas.MangaResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetMangaIdFeed {
    namespace Parameters {
      export type ContentRating = Array<
        "safe" | "suggestive" | "erotica" | "pornographic"
      >;
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
       */
      export type CreatedAtSince = string; // ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
      export type ExcludedGroups = string /* uuid */[];
      export type ExcludedOriginalLanguage = string /* ^[a-zA-Z\-]{2,5}$ */[];
      export type ExcludedUploaders = string /* uuid */[];
      export type IncludeEmptyPages = 0 | 1;
      export type IncludeExternalUrl = 0 | 1;
      export type IncludeFuturePublishAt = 0 | 1;
      export type IncludeFutureUpdates = "0" | "1";
      export type Includes =
        /**
         * ReferenceExpansionChapter
         * Reference expansion options for chapter entities or lists
         */
        Components.Schemas.ReferenceExpansionChapter;
      export type Limit = number;
      export type Offset = number;
      export interface Order {
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
        publishAt?: "asc" | "desc";
        readableAt?: "asc" | "desc";
        volume?: "asc" | "desc";
        chapter?: "asc" | "desc";
      }
      export type OriginalLanguage = string /* ^[a-zA-Z\-]{2,5}$ */[];
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
       */
      export type PublishAtSince = string; // ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
      export type TranslatedLanguage = string /* ^[a-zA-Z\-]{2,5}$ */[];
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
       */
      export type UpdatedAtSince = string; // ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
    }
    export interface QueryParameters {
      limit?: Parameters.Limit;
      offset?: Parameters.Offset;
      "translatedLanguage[]"?: Parameters.TranslatedLanguage;
      "originalLanguage[]"?: Parameters.OriginalLanguage;
      "excludedOriginalLanguage[]"?: Parameters.ExcludedOriginalLanguage;
      "contentRating[]"?: Parameters.ContentRating;
      "excludedGroups[]"?: Parameters.ExcludedGroups;
      "excludedUploaders[]"?: Parameters.ExcludedUploaders;
      includeFutureUpdates?: Parameters.IncludeFutureUpdates;
      createdAtSince?: /* DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0 */ Parameters.CreatedAtSince /* ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$ */;
      updatedAtSince?: /* DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0 */ Parameters.UpdatedAtSince /* ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$ */;
      publishAtSince?: /* DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0 */ Parameters.PublishAtSince /* ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$ */;
      order?: Parameters.Order;
      "includes[]"?: Parameters.Includes;
      includeEmptyPages?: Parameters.IncludeEmptyPages;
      includeFuturePublishAt?: Parameters.IncludeFuturePublishAt;
      includeExternalUrl?: Parameters.IncludeExternalUrl;
    }
    namespace Responses {
      export type $200 = /* ChapterList */ Components.Schemas.ChapterList;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetMangaIdStatus {
    namespace Responses {
      /**
       * example:
       * {
       *   "result": "ok",
       *   "status": "reading"
       * }
       */
      export interface $200 {
        result?: string;
        status?:
          | "reading"
          | "on_hold"
          | "plan_to_read"
          | "dropped"
          | "re_reading"
          | "completed";
      }
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetMangaRandom {
    namespace Parameters {
      export type ContentRating = Array<
        "safe" | "suggestive" | "erotica" | "pornographic"
      >;
      export type ExcludedTags = string /* uuid */[];
      export type ExcludedTagsMode = "AND" | "OR";
      export type IncludedTags = string /* uuid */[];
      export type IncludedTagsMode = "AND" | "OR";
      export type Includes =
        /**
         * ReferenceExpansionManga
         * Reference expansion options for manga entities or lists
         */
        Components.Schemas.ReferenceExpansionManga;
    }
    export interface QueryParameters {
      "includes[]"?: Parameters.Includes;
      "contentRating[]"?: Parameters.ContentRating;
      "includedTags[]"?: Parameters.IncludedTags;
      includedTagsMode?: Parameters.IncludedTagsMode;
      "excludedTags[]"?: Parameters.ExcludedTags;
      excludedTagsMode?: Parameters.ExcludedTagsMode;
    }
    namespace Responses {
      export type $200 = /* MangaResponse */ Components.Schemas.MangaResponse;
    }
  }
  namespace GetMangaRelation {
    namespace Parameters {
      export type Includes =
        /**
         * ReferenceExpansionMangaRelation
         * Reference expansion options for manga relation entities or lists
         */
        Components.Schemas.ReferenceExpansionMangaRelation;
    }
    export interface QueryParameters {
      "includes[]"?: Parameters.Includes;
    }
    namespace Responses {
      export type $200 =
        /* MangaRelationList */ Components.Schemas.MangaRelationList;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetMangaStatus {
    namespace Parameters {
      export type Status =
        | "reading"
        | "on_hold"
        | "plan_to_read"
        | "dropped"
        | "re_reading"
        | "completed";
    }
    export interface QueryParameters {
      status?: Parameters.Status;
    }
    namespace Responses {
      export interface $200 {
        result?: string;
        statuses?: Record<
          string,
          | "reading"
          | "on_hold"
          | "plan_to_read"
          | "dropped"
          | "re_reading"
          | "completed"
        >;
      }
    }
  }
  namespace GetMangaTag {
    namespace Responses {
      export type $200 = /* TagResponse */ Components.Schemas.TagResponse;
    }
  }
  namespace GetPing {
    namespace Responses {
      export type $200 = string;
    }
  }
  namespace GetRating {
    namespace Parameters {
      export type Manga = string /* uuid */[];
    }
    export interface QueryParameters {
      manga: Parameters.Manga;
    }
    namespace Responses {
      /**
       * example:
       * {
       *   "result": "ok",
       *   "ratings": {
       *     "f9c33607-9180-4ba6-b85c-e4b5faee7192": {
       *       "rating": 7,
       *       "createdAt": "2021-12-27T08:47:37+00:00"
       *     }
       *   }
       * }
       */
      export interface $200 {
        result?: string;
        ratings?: Record<
          string,
          {
            rating?: number;
            createdAt?: string; // date-time
          }
        >;
      }
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetReadingHistory {
    namespace Responses {
      export interface $200 {
        result?: string;
        ratings?: Array<{
          chapterId?: string;
          readDate?: string; // date-time
        }>;
      }
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetReportReasonsByCategory {
    namespace Responses {
      export interface $200 {
        result?: string;
        response?: string;
        data?: Array<{
          id?: string; // uuid
          type?: string;
          attributes?: {
            reason?: /* LocalizedString */ Components.Schemas.LocalizedString;
            detailsRequired?: boolean;
            category?:
              | "manga"
              | "chapter"
              | "scanlation_group"
              | "user"
              | "author";
            version?: number;
          };
        }>;
        limit?: number;
        offset?: number;
        total?: number;
      }
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetReports {
    namespace Parameters {
      export type Category =
        | "manga"
        | "chapter"
        | "scanlation_group"
        | "user"
        | "author";
      export type Includes =
        /**
         * ReferenceExpansionReport
         * Reference expansion options for user report entities or lists
         */
        Components.Schemas.ReferenceExpansionReport;
      export type Limit = number;
      export type ObjectId = string; // uuid
      export type Offset = number;
      export interface Order {
        createdAt?: "asc" | "desc";
      }
      export type ReasonId = string; // uuid
      export type Status = "waiting" | "accepted" | "refused" | "autoresolved";
    }
    export interface QueryParameters {
      limit?: Parameters.Limit;
      offset?: Parameters.Offset;
      category?: Parameters.Category;
      reasonId?: Parameters.ReasonId /* uuid */;
      objectId?: Parameters.ObjectId /* uuid */;
      status?: Parameters.Status;
      order?: Parameters.Order;
      "includes[]"?: Parameters.Includes;
    }
    namespace Responses {
      export type $200 =
        /* ReportListResponse */ Components.Schemas.ReportListResponse;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetSearchGroup {
    namespace Parameters {
      export type FocusedLanguage = string;
      export type Ids = string /* uuid */[];
      export type Includes =
        /**
         * ReferenceExpansionScanlationGroup
         * Reference expansion options for scanlation group entities or lists
         */
        Components.Schemas.ReferenceExpansionScanlationGroup;
      export type Limit = number;
      export type Name = string;
      export type Offset = number;
      export interface Order {
        name?: "asc" | "desc";
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
        followedCount?: "asc" | "desc";
        relevance?: "asc" | "desc";
      }
    }
    export interface QueryParameters {
      limit?: Parameters.Limit;
      offset?: Parameters.Offset;
      "ids[]"?: Parameters.Ids;
      name?: Parameters.Name;
      focusedLanguage?: Parameters.FocusedLanguage;
      "includes[]"?: Parameters.Includes;
      order?: Parameters.Order;
    }
    namespace Responses {
      export type $200 =
        /* ScanlationGroupList */ Components.Schemas.ScanlationGroupList;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetSearchManga {
    namespace Parameters {
      export type Artists = string /* uuid */[];
      export type AuthorOrArtist = string; // uuid
      export type Authors = string /* uuid */[];
      export type AvailableTranslatedLanguage =
        string /* ^[a-zA-Z\-]{2,5}$ */[];
      export type ContentRating = Array<
        "safe" | "suggestive" | "erotica" | "pornographic"
      >;
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
       */
      export type CreatedAtSince = string; // ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
      export type ExcludedOriginalLanguage = string /* ^[a-zA-Z\-]{2,5}$ */[];
      export type ExcludedTags = string /* uuid */[];
      export type ExcludedTagsMode = "AND" | "OR";
      export type Group = string; // uuid
      export type HasAvailableChapters = "0" | "1" | "true" | "false";
      export type Ids = string /* uuid */[];
      export type IncludedTags = string /* uuid */[];
      export type IncludedTagsMode = "AND" | "OR";
      export type Includes =
        /**
         * ReferenceExpansionManga
         * Reference expansion options for manga entities or lists
         */
        Components.Schemas.ReferenceExpansionManga;
      export type Limit = number; // ^\d+$
      export type Offset = number; // ^\d+$
      export interface Order {
        title?: "asc" | "desc";
        year?: "asc" | "desc";
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
        latestUploadedChapter?: "asc" | "desc";
        followedCount?: "asc" | "desc";
        relevance?: "asc" | "desc";
        rating?: "asc" | "desc";
      }
      export type OriginalLanguage = string /* ^[a-zA-Z\-]{2,5}$ */[];
      export type PublicationDemographic = Array<
        "shounen" | "shoujo" | "josei" | "seinen" | "none"
      >;
      export type Status = Array<
        "ongoing" | "completed" | "hiatus" | "cancelled"
      >;
      export type Title = string;
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
       */
      export type UpdatedAtSince = string; // ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
      export type Year = number /* ^\\d{4}$ */ | "none";
    }
    export interface QueryParameters {
      limit?: Parameters.Limit /* ^\d+$ */;
      offset?: Parameters.Offset /* ^\d+$ */;
      title?: Parameters.Title;
      authorOrArtist?: Parameters.AuthorOrArtist /* uuid */;
      "authors[]"?: Parameters.Authors;
      "artists[]"?: Parameters.Artists;
      year?: Parameters.Year;
      "includedTags[]"?: Parameters.IncludedTags;
      includedTagsMode?: Parameters.IncludedTagsMode;
      "excludedTags[]"?: Parameters.ExcludedTags;
      excludedTagsMode?: Parameters.ExcludedTagsMode;
      "status[]"?: Parameters.Status;
      "originalLanguage[]"?: Parameters.OriginalLanguage;
      "excludedOriginalLanguage[]"?: Parameters.ExcludedOriginalLanguage;
      "availableTranslatedLanguage[]"?: Parameters.AvailableTranslatedLanguage;
      "publicationDemographic[]"?: Parameters.PublicationDemographic;
      "ids[]"?: Parameters.Ids;
      "contentRating[]"?: Parameters.ContentRating;
      createdAtSince?: /* DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0 */ Parameters.CreatedAtSince /* ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$ */;
      updatedAtSince?: /* DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0 */ Parameters.UpdatedAtSince /* ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$ */;
      order?: Parameters.Order;
      "includes[]"?: Parameters.Includes;
      hasAvailableChapters?: Parameters.HasAvailableChapters;
      group?: Parameters.Group /* uuid */;
    }
    namespace Responses {
      export type $200 = /* MangaList */ Components.Schemas.MangaList;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetSettings {
    namespace Responses {
      export interface $200 {
        result?: string;
        updatedAt?: string; // date-time
        /**
         * Settings that were validated by linked template
         */
        settings?: Record<string, any>;
        /**
         * Settings template UUID
         */
        template?: string; // uuid
      }
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetSettingsTemplate {
    namespace Responses {
      /**
       * JSON Schema to validate settings
       */
      export interface $200 {}
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetSettingsTemplateVersion {
    namespace Parameters {
      export type Version = string; // uuid
    }
    export interface PathParameters {
      version: Parameters.Version /* uuid */;
    }
    namespace Responses {
      /**
       * JSON Schema to validate settings
       */
      export interface $200 {}
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetStatisticsChapterUuid {
    namespace Parameters {
      export type Uuid = string; // uuid
    }
    export interface PathParameters {
      uuid: Parameters.Uuid /* uuid */;
    }
    namespace Responses {
      /**
       * example:
       * {
       *   "result": "ok",
       *   "statistics": {
       *     "f9c33607-9180-4ba6-b85c-e4b5faee7192": {
       *       "comments": {
       *         "threadId": 4756728,
       *         "repliesCount": 12
       *       }
       *     }
       *   }
       * }
       */
      export interface $200 {
        result?: string;
        statistics?: Record<
          string,
          {
            comments?: /**
             * StatisticsDetailsComments
             * Comments-related statistics of an entity.
             * If it is `null`, the entity doesn't have a backing comments thread, and therefore has no comments yet.
             *
             */
            Components.Schemas.StatisticsDetailsComments;
          }
        >;
      }
    }
  }
  namespace GetStatisticsChapters {
    namespace Parameters {
      export type Chapter = string /* uuid */[];
    }
    export interface QueryParameters {
      "chapter[]": Parameters.Chapter;
    }
    namespace Responses {
      /**
       * example:
       * {
       *   "result": "ok",
       *   "statistics": {
       *     "f9c33607-9180-4ba6-b85c-e4b5faee7192": {
       *       "comments": {
       *         "threadId": 4756728,
       *         "repliesCount": 12
       *       }
       *     }
       *   }
       * }
       */
      export interface $200 {
        result?: string;
        statistics?: Record<
          string,
          {
            comments?: /**
             * StatisticsDetailsComments
             * Comments-related statistics of an entity.
             * If it is `null`, the entity doesn't have a backing comments thread, and therefore has no comments yet.
             *
             */
            Components.Schemas.StatisticsDetailsComments;
          }
        >;
      }
    }
  }
  namespace GetStatisticsGroupUuid {
    namespace Parameters {
      export type Uuid = string; // uuid
    }
    export interface PathParameters {
      uuid: Parameters.Uuid /* uuid */;
    }
    namespace Responses {
      /**
       * example:
       * {
       *   "result": "ok",
       *   "statistics": {
       *     "f9c33607-9180-4ba6-b85c-e4b5faee7192": {
       *       "comments": {
       *         "threadId": 4756728,
       *         "repliesCount": 12
       *       }
       *     }
       *   }
       * }
       */
      export interface $200 {
        result?: string;
        statistics?: Record<
          string,
          {
            comments?: /**
             * StatisticsDetailsComments
             * Comments-related statistics of an entity.
             * If it is `null`, the entity doesn't have a backing comments thread, and therefore has no comments yet.
             *
             */
            Components.Schemas.StatisticsDetailsComments;
          }
        >;
      }
    }
  }
  namespace GetStatisticsGroups {
    namespace Parameters {
      export type Group = string /* uuid */[];
    }
    export interface QueryParameters {
      "group[]": Parameters.Group;
    }
    namespace Responses {
      /**
       * example:
       * {
       *   "result": "ok",
       *   "statistics": {
       *     "f9c33607-9180-4ba6-b85c-e4b5faee7192": {
       *       "comments": {
       *         "threadId": 4756728,
       *         "repliesCount": 12
       *       }
       *     }
       *   }
       * }
       */
      export interface $200 {
        result?: string;
        statistics?: Record<
          string,
          {
            comments?: /**
             * StatisticsDetailsComments
             * Comments-related statistics of an entity.
             * If it is `null`, the entity doesn't have a backing comments thread, and therefore has no comments yet.
             *
             */
            Components.Schemas.StatisticsDetailsComments;
          }
        >;
      }
    }
  }
  namespace GetStatisticsManga {
    namespace Parameters {
      export type Manga = string /* uuid */[];
    }
    export interface QueryParameters {
      "manga[]": Parameters.Manga;
    }
    namespace Responses {
      /**
       * example:
       * {
       *   "result": "ok",
       *   "statistics": {
       *     "f9c33607-9180-4ba6-b85c-e4b5faee7192": {
       *       "comments": {
       *         "threadId": 4756728,
       *         "repliesCount": 12
       *       },
       *       "rating": {
       *         "average": 7.5,
       *         "bayesian": 6.47
       *       },
       *       "follows": 3
       *     }
       *   }
       * }
       */
      export interface $200 {
        result?: string;
        statistics?: Record<
          string,
          {
            comments?: /**
             * StatisticsDetailsComments
             * Comments-related statistics of an entity.
             * If it is `null`, the entity doesn't have a backing comments thread, and therefore has no comments yet.
             *
             */
            Components.Schemas.StatisticsDetailsComments;
            rating?: {
              /**
               * Will be nullable if no ratings has been done
               */
              average?: number | null;
              /**
               * Average weighted on all the Manga population
               */
              bayesian?: number;
            };
            follows?: number;
          }
        >;
      }
    }
  }
  namespace GetStatisticsMangaUuid {
    namespace Parameters {
      export type Uuid = string; // uuid
    }
    export interface PathParameters {
      uuid: Parameters.Uuid /* uuid */;
    }
    namespace Responses {
      /**
       * example:
       * {
       *   "result": "ok",
       *   "statistics": {
       *     "f9c33607-9180-4ba6-b85c-e4b5faee7192": {
       *       "comments": {
       *         "threadId": 4756728,
       *         "repliesCount": 12
       *       },
       *       "rating": {
       *         "average": 7.5,
       *         "bayesian": 6.47,
       *         "distribution": {
       *           "1": 0,
       *           "2": 0,
       *           "3": 0,
       *           "4": 0,
       *           "5": 0,
       *           "6": 0,
       *           "7": 2,
       *           "8": 2,
       *           "9": 0,
       *           "10": 0
       *         }
       *       },
       *       "follows": 3
       *     }
       *   }
       * }
       */
      export interface $200 {
        result?: string;
        statistics?: Record<
          string,
          {
            comments?: /**
             * StatisticsDetailsComments
             * Comments-related statistics of an entity.
             * If it is `null`, the entity doesn't have a backing comments thread, and therefore has no comments yet.
             *
             */
            Components.Schemas.StatisticsDetailsComments;
            rating?: {
              /**
               * Will be nullable if no ratings has been given
               */
              average?: number | null;
              /**
               * Average weighted on all the Manga population
               */
              bayesian?: number;
              distribution?: {
                "1"?: number;
                "2"?: number;
                "3"?: number;
                "4"?: number;
                "5"?: number;
                "6"?: number;
                "7"?: number;
                "8"?: number;
                "9"?: number;
                "10"?: number;
              };
            };
            follows?: number;
          }
        >;
      }
    }
  }
  namespace GetUploadSession {
    namespace Responses {
      export type $200 = /* UploadSession */ Components.Schemas.UploadSession;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetUser {
    namespace Parameters {
      export type Ids = string /* uuid */[];
      export type Limit = number;
      export type Offset = number;
      export interface Order {
        username?: "asc" | "desc";
      }
      export type Username = string;
    }
    export interface QueryParameters {
      limit?: Parameters.Limit;
      offset?: Parameters.Offset;
      "ids[]"?: Parameters.Ids;
      username?: Parameters.Username;
      order?: Parameters.Order;
    }
    namespace Responses {
      export type $200 = /* UserList */ Components.Schemas.UserList;
    }
  }
  namespace GetUserFollowsGroup {
    namespace Parameters {
      export type Includes =
        /**
         * ReferenceExpansionScanlationGroup
         * Reference expansion options for scanlation group entities or lists
         */
        Components.Schemas.ReferenceExpansionScanlationGroup;
      export type Limit = number;
      export type Offset = number;
    }
    export interface QueryParameters {
      limit?: Parameters.Limit;
      offset?: Parameters.Offset;
      "includes[]"?: Parameters.Includes;
    }
    namespace Responses {
      export type $200 =
        /* ScanlationGroupList */ Components.Schemas.ScanlationGroupList;
    }
  }
  namespace GetUserFollowsGroupId {
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
      export type $404 = /* Response */ Components.Schemas.Response;
    }
  }
  namespace GetUserFollowsList {
    namespace Parameters {
      export type Limit = number;
      export type Offset = number;
    }
    export interface QueryParameters {
      limit?: Parameters.Limit;
      offset?: Parameters.Offset;
    }
    namespace Responses {
      export type $200 = /* CustomListList */ Components.Schemas.CustomListList;
    }
  }
  namespace GetUserFollowsListId {
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
      export type $404 = /* Response */ Components.Schemas.Response;
    }
  }
  namespace GetUserFollowsManga {
    namespace Parameters {
      export type Includes =
        /**
         * ReferenceExpansionManga
         * Reference expansion options for manga entities or lists
         */
        Components.Schemas.ReferenceExpansionManga;
      export type Limit = number;
      export type Offset = number;
    }
    export interface QueryParameters {
      limit?: Parameters.Limit;
      offset?: Parameters.Offset;
      "includes[]"?: Parameters.Includes;
    }
    namespace Responses {
      export type $200 = /* MangaList */ Components.Schemas.MangaList;
    }
  }
  namespace GetUserFollowsMangaFeed {
    namespace Parameters {
      export type ContentRating = Array<
        "safe" | "suggestive" | "erotica" | "pornographic"
      >;
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
       */
      export type CreatedAtSince = string; // ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
      export type ExcludedGroups = string /* uuid */[];
      export type ExcludedOriginalLanguage = string /* ^[a-zA-Z\-]{2,5}$ */[];
      export type ExcludedUploaders = string /* uuid */[];
      export type IncludeEmptyPages = 0 | 1;
      export type IncludeExternalUrl = 0 | 1;
      export type IncludeFuturePublishAt = 0 | 1;
      export type IncludeFutureUpdates = "0" | "1";
      export type Includes =
        /**
         * ReferenceExpansionChapter
         * Reference expansion options for chapter entities or lists
         */
        Components.Schemas.ReferenceExpansionChapter;
      export type Limit = number;
      export type Offset = number;
      export interface Order {
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
        publishAt?: "asc" | "desc";
        readableAt?: "asc" | "desc";
        volume?: "asc" | "desc";
        chapter?: "asc" | "desc";
      }
      export type OriginalLanguage = string /* ^[a-zA-Z\-]{2,5}$ */[];
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
       */
      export type PublishAtSince = string; // ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
      export type TranslatedLanguage = string /* ^[a-zA-Z\-]{2,5}$ */[];
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
       */
      export type UpdatedAtSince = string; // ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
    }
    export interface QueryParameters {
      limit?: Parameters.Limit;
      offset?: Parameters.Offset;
      "translatedLanguage[]"?: Parameters.TranslatedLanguage;
      "originalLanguage[]"?: Parameters.OriginalLanguage;
      "excludedOriginalLanguage[]"?: Parameters.ExcludedOriginalLanguage;
      "contentRating[]"?: Parameters.ContentRating;
      "excludedGroups[]"?: Parameters.ExcludedGroups;
      "excludedUploaders[]"?: Parameters.ExcludedUploaders;
      includeFutureUpdates?: Parameters.IncludeFutureUpdates;
      createdAtSince?: /* DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0 */ Parameters.CreatedAtSince /* ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$ */;
      updatedAtSince?: /* DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0 */ Parameters.UpdatedAtSince /* ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$ */;
      publishAtSince?: /* DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0 */ Parameters.PublishAtSince /* ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$ */;
      order?: Parameters.Order;
      "includes[]"?: Parameters.Includes;
      includeEmptyPages?: Parameters.IncludeEmptyPages;
      includeFuturePublishAt?: Parameters.IncludeFuturePublishAt;
      includeExternalUrl?: Parameters.IncludeExternalUrl;
    }
    namespace Responses {
      export type $200 = /* ChapterList */ Components.Schemas.ChapterList;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace GetUserFollowsMangaId {
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
      export type $404 = /* Response */ Components.Schemas.Response;
    }
  }
  namespace GetUserFollowsUser {
    namespace Parameters {
      export type Limit = number;
      export type Offset = number;
    }
    export interface QueryParameters {
      limit?: Parameters.Limit;
      offset?: Parameters.Offset;
    }
    namespace Responses {
      export type $200 = /* UserList */ Components.Schemas.UserList;
    }
  }
  namespace GetUserFollowsUserId {
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
      export type $404 = /* Response */ Components.Schemas.Response;
    }
  }
  namespace GetUserId {
    namespace Responses {
      export type $200 = /* UserResponse */ Components.Schemas.UserResponse;
    }
  }
  namespace GetUserIdList {
    namespace Parameters {
      export type Limit = number;
      export type Offset = number;
    }
    export interface QueryParameters {
      limit?: Parameters.Limit;
      offset?: Parameters.Offset;
    }
    namespace Responses {
      export type $200 = /* CustomListList */ Components.Schemas.CustomListList;
    }
  }
  namespace GetUserList {
    namespace Parameters {
      export type Limit = number;
      export type Offset = number;
    }
    export interface QueryParameters {
      limit?: Parameters.Limit;
      offset?: Parameters.Offset;
    }
    namespace Responses {
      export type $200 = /* CustomListList */ Components.Schemas.CustomListList;
    }
  }
  namespace GetUserMe {
    namespace Responses {
      export type $200 = /* UserResponse */ Components.Schemas.UserResponse;
    }
  }
  namespace Group$Id {
    namespace Parameters {
      export type Id = string; // uuid
    }
    export interface PathParameters {
      id: Parameters.Id /* uuid */;
    }
  }
  namespace Group$IdFollow {
    namespace Parameters {
      export type Id = string; // uuid
    }
    export interface PathParameters {
      id: Parameters.Id /* uuid */;
    }
  }
  namespace List$Id {
    namespace Parameters {
      export type Id = string; // uuid
    }
    export interface PathParameters {
      id: Parameters.Id /* uuid */;
    }
  }
  namespace List$IdFeed {
    namespace Parameters {
      export type Id = string; // uuid
    }
    export interface PathParameters {
      id: Parameters.Id /* uuid */;
    }
  }
  namespace List$IdFollow {
    namespace Parameters {
      export type Id = string; // uuid
    }
    export interface PathParameters {
      id: Parameters.Id /* uuid */;
    }
  }
  namespace Manga$Id {
    namespace Parameters {
      export type Id = string; // uuid
    }
    export interface PathParameters {
      id: Parameters.Id /* uuid */;
    }
  }
  namespace Manga$IdAggregate {
    namespace Parameters {
      export type Id = string; // uuid
    }
    export interface PathParameters {
      id: Parameters.Id /* uuid */;
    }
  }
  namespace Manga$IdFeed {
    namespace Parameters {
      export type Id = string; // uuid
    }
    export interface PathParameters {
      id: Parameters.Id /* uuid */;
    }
  }
  namespace Manga$IdFollow {
    namespace Parameters {
      export type Id = string; // uuid
    }
    export interface PathParameters {
      id: Parameters.Id /* uuid */;
    }
  }
  namespace Manga$IdList$ListId {
    namespace Parameters {
      export type Id = string; // uuid
      export type ListId = string; // uuid
    }
    export interface PathParameters {
      id: Parameters.Id /* uuid */;
      listId: Parameters.ListId /* uuid */;
    }
  }
  namespace Manga$IdRead {
    namespace Parameters {
      export type Id = string; // uuid
    }
    export interface PathParameters {
      id: Parameters.Id /* uuid */;
    }
  }
  namespace Manga$IdStatus {
    namespace Parameters {
      export type Id = string; // uuid
    }
    export interface PathParameters {
      id: Parameters.Id /* uuid */;
    }
  }
  namespace Manga$MangaIdRelation {
    namespace Parameters {
      export type MangaId = string; // uuid
    }
    export interface PathParameters {
      mangaId: Parameters.MangaId /* uuid */;
    }
  }
  namespace Manga$MangaIdRelation$Id {
    namespace Parameters {
      export type Id = string; // uuid
      export type MangaId = string; // uuid
    }
    export interface PathParameters {
      mangaId: Parameters.MangaId /* uuid */;
      id: Parameters.Id /* uuid */;
    }
  }
  namespace MangaDraft {
    namespace Parameters {
      export type Includes =
        /**
         * ReferenceExpansionManga
         * Reference expansion options for manga entities or lists
         */
        Components.Schemas.ReferenceExpansionManga;
      export type Limit = number;
      export type Offset = number;
      export interface Order {
        title?: "asc" | "desc";
        year?: "asc" | "desc";
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
      }
      export type State = "draft" | "submitted" | "rejected";
    }
    export interface QueryParameters {
      limit?: Parameters.Limit;
      offset?: Parameters.Offset;
      state?: Parameters.State;
      order?: Parameters.Order;
      "includes[]"?: Parameters.Includes;
    }
  }
  namespace MangaDraft$Id {
    namespace Parameters {
      export type Id = string; // uuid
      export type Includes =
        /**
         * ReferenceExpansionManga
         * Reference expansion options for manga entities or lists
         */
        Components.Schemas.ReferenceExpansionManga;
    }
    export interface PathParameters {
      id: Parameters.Id /* uuid */;
    }
    export interface QueryParameters {
      "includes[]"?: Parameters.Includes;
    }
  }
  namespace MangaDraft$IdCommit {
    namespace Parameters {
      export type Id = string; // uuid
    }
    export interface PathParameters {
      id: Parameters.Id /* uuid */;
    }
  }
  namespace PostAuthLogin {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export type RequestBody = /* Login */ Components.Schemas.Login;
    namespace Responses {
      export type $200 = /* LoginResponse */ Components.Schemas.LoginResponse;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $401 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PostAuthLogout {
    namespace Responses {
      export type $200 = /* LogoutResponse */ Components.Schemas.LogoutResponse;
      export type $503 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PostAuthRefresh {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export type RequestBody =
      /* RefreshToken */ Components.Schemas.RefreshToken;
    namespace Responses {
      export type $200 =
        /* RefreshResponse */ Components.Schemas.RefreshResponse;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $401 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PostAuthor {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export type RequestBody =
      /* AuthorCreate */ Components.Schemas.AuthorCreate;
    namespace Responses {
      export type $200 = /* AuthorResponse */ Components.Schemas.AuthorResponse;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PostCaptchaSolve {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    /**
     *
     */
    export interface RequestBody {
      captchaChallenge: string;
    }
    namespace Responses {
      export interface $200 {
        result?: "ok" | "error";
      }
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PostCreateApiclient {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export type RequestBody =
      /* ApiClientCreate */ Components.Schemas.ApiClientCreate;
    namespace Responses {
      export type $200 =
        /* ApiClientResponse */ Components.Schemas.ApiClientResponse;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PostEditApiclient {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export type RequestBody = /* ApiClient */ Components.Schemas.ApiClientEdit;
    namespace Responses {
      export type $200 =
        /* ApiClientResponse */ Components.Schemas.ApiClientResponse;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PostGroup {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export type RequestBody =
      /* CreateScanlationGroup */ Components.Schemas.CreateScanlationGroup;
    namespace Responses {
      export type $200 =
        /* ScanlationGroupResponse */ Components.Schemas.ScanlationGroupResponse;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PostGroupIdFollow {
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PostLegacyMapping {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export type RequestBody =
      /* MappingIdBody */ Components.Schemas.MappingIdBody;
    namespace Responses {
      export type $200 =
        /* MappingIdResponse */ Components.Schemas.MappingIdResponse;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PostList {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export type RequestBody =
      /* CustomListCreate */ Components.Schemas.CustomListCreate;
    namespace Responses {
      export type $200 =
        /* CustomListResponse */ Components.Schemas.CustomListResponse;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PostManga {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export type RequestBody =
      /**
       * MangaRequest
       *
       */
      Components.Schemas.MangaCreate;
    namespace Responses {
      export type $200 = /* MangaResponse */ Components.Schemas.MangaResponse;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PostMangaChapterReadmarkers {
    namespace Parameters {
      export type UpdateHistory = boolean;
    }
    export interface QueryParameters {
      updateHistory?: Parameters.UpdateHistory;
    }
    export type RequestBody =
      /* ChapterReadMarkersBatch */ Components.Schemas.ChapterReadMarkerBatch;
    namespace Responses {
      export interface $200 {
        result?: "ok";
      }
    }
  }
  namespace PostMangaIdFollow {
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PostMangaIdListListId {
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PostMangaIdStatus {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export type RequestBody =
      /* UpdateMangaStatus */ Components.Schemas.UpdateMangaStatus;
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PostMangaRelation {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export type RequestBody =
      /**
       * MangaRelationRequest
       *
       */
      Components.Schemas.MangaRelationCreate;
    namespace Responses {
      export type $200 =
        /* MangaRelationResponse */ Components.Schemas.MangaRelationResponse;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PostRatingMangaId {
    export interface RequestBody {
      rating?: number;
    }
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PostRegenerateApiclientSecret {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export interface RequestBody {}
    namespace Responses {
      export interface $200 {
        result?: "ok";
        data?: string;
      }
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PostReport {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export interface RequestBody {
      category?: "manga" | "chapter" | "user" | "scanlation_group" | "author";
      reason?: string; // uuid
      objectId?: string; // uuid
      details?: string;
    }
    namespace Responses {
      export type $201 = /* Response */ Components.Schemas.Response;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PostSettings {
    export interface RequestBody {
      /**
       * A JSON object that can be validated against the lastest available template
       */
      settings?: Record<string, any>;
      /**
       * Format: 2022-03-14T13:19:37
       */
      updatedAt?: string; // date-time
    }
    namespace Responses {
      export interface $200 {
        result?: string;
        updatedAt?: string; // date-time
        /**
         * Settings that were validated against the linked template
         */
        settings?: Record<string, any>;
        /**
         * Settings template UUID
         */
        template?: string; // uuid
      }
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PostSettingsTemplate {
    /**
     * A JSON Schema to validate settings
     */
    export interface RequestBody {}
    namespace Responses {
      /**
       * JSON Schema to validate settings
       */
      export interface $200 {}
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PostUserDeleteCode {
    namespace Responses {
      export type $200 = /* Response */ Components.Schemas.Response;
    }
  }
  namespace PutAuthorId {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export type RequestBody = /* AuthorEdit */ Components.Schemas.AuthorEdit;
    namespace Responses {
      export type $200 = /* AuthorResponse */ Components.Schemas.AuthorResponse;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PutChapterId {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export type RequestBody =
      /* ChapterRequest */ Components.Schemas.ChapterEdit;
    namespace Responses {
      export type $200 =
        /* ChapterResponse */ Components.Schemas.ChapterResponse;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PutGroupId {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export type RequestBody =
      /* ScanlationGroupEdit */ Components.Schemas.ScanlationGroupEdit;
    namespace Responses {
      export type $200 =
        /* ScanlationGroupResponse */ Components.Schemas.ScanlationGroupResponse;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PutListId {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export type RequestBody =
      /* CustomListEdit */ Components.Schemas.CustomListEdit;
    namespace Responses {
      export type $200 =
        /* CustomListResponse */ Components.Schemas.CustomListResponse;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PutMangaId {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    /**
     * MangaRequest
     *
     */
    export interface RequestBody {
      title?: /* LocalizedString */ Components.Schemas.LocalizedString;
      altTitles?: /* LocalizedString */ Components.Schemas.LocalizedString[];
      description?: /* LocalizedString */ Components.Schemas.LocalizedString;
      authors?: string /* uuid */[];
      artists?: string /* uuid */[];
      links?: Record<string, string>;
      originalLanguage?: string; // ^[a-z]{2}(-[a-z]{2})?$
      lastVolume?: string | null;
      lastChapter?: string | null;
      publicationDemographic?: "shounen" | "shoujo" | "josei" | "seinen";
      status?: "completed" | "ongoing" | "cancelled" | "hiatus";
      /**
       * Year of release
       */
      year?: number | null;
      contentRating?: "safe" | "suggestive" | "erotica" | "pornographic";
      chapterNumbersResetOnNewVolume?: boolean;
      tags?: string /* uuid */[];
      primaryCover?: string | null; // uuid
      version: number;
    }
    namespace Responses {
      export type $200 = /* MangaResponse */ Components.Schemas.MangaResponse;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace PutUploadSessionFile {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export interface RequestBody {
      file?: string; // binary
    }
    namespace Responses {
      export interface $200 {
        result?: "ok" | "error";
        errors?: /* Error */ Components.Schemas.Error[];
        data?: /* UploadSessionFile */ Components.Schemas.UploadSessionFile[];
      }
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace Rating$MangaId {
    namespace Parameters {
      export type MangaId = string; // uuid
    }
    export interface PathParameters {
      mangaId: Parameters.MangaId /* uuid */;
    }
  }
  namespace ReportReasons$Category {
    namespace Parameters {
      export type Category =
        | "manga"
        | "chapter"
        | "scanlation_group"
        | "user"
        | "author";
    }
    export interface PathParameters {
      category: Parameters.Category;
    }
  }
  namespace UnfollowListId {
    export interface RequestBody {}
    namespace Responses {
      export interface $200 {
        result?: "ok";
      }
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $404 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace Upload$UploadSessionId {
    namespace Parameters {
      export type UploadSessionId = string; // uuid
    }
    export interface PathParameters {
      uploadSessionId: Parameters.UploadSessionId /* uuid */;
    }
  }
  namespace Upload$UploadSessionId$UploadSessionFileId {
    namespace Parameters {
      export type UploadSessionFileId = string; // uuid
      export type UploadSessionId = string; // uuid
    }
    export interface PathParameters {
      uploadSessionId: Parameters.UploadSessionId /* uuid */;
      uploadSessionFileId: Parameters.UploadSessionFileId /* uuid */;
    }
  }
  namespace Upload$UploadSessionIdBatch {
    namespace Parameters {
      export type UploadSessionId = string; // uuid
    }
    export interface PathParameters {
      uploadSessionId: Parameters.UploadSessionId /* uuid */;
    }
  }
  namespace Upload$UploadSessionIdCommit {
    namespace Parameters {
      export type UploadSessionId = string; // uuid
    }
    export interface PathParameters {
      uploadSessionId: Parameters.UploadSessionId /* uuid */;
    }
  }
  namespace UploadBegin$ChapterId {
    namespace Parameters {
      export type ChapterId = string; // uuid
    }
    export interface PathParameters {
      chapterId: Parameters.ChapterId /* uuid */;
    }
  }
  namespace UploadCheckApprovalRequired {
    export interface RequestBody {
      manga?: string; // uuid
      locale?: string; // ^[a-z]{2}(-[a-z]{2})?$
    }
    namespace Responses {
      /**
       * Response
       */
      export interface $200 {
        result?: "ok" | "error";
        requiresApproval?: boolean;
      }
      export type $404 = /* Response */ Components.Schemas.Response;
    }
  }
  namespace UploadCover {
    export interface HeaderParameters {
      "Content-Type": Parameters.ContentType;
    }
    namespace Parameters {
      export type ContentType = string;
    }
    export interface RequestBody {
      file?: string; // binary
      volume?: string | null; // ^(0|[1-9]\\d*)((\\.\\d+){1,2})?[a-z]?$
      description?: string;
      locale?: string; // ^[a-z]{2}(-[a-z]{2})?$
    }
    namespace Responses {
      export type $200 = /* CoverResponse */ Components.Schemas.CoverResponse;
      export type $400 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
      export type $403 = /* ErrorResponse */ Components.Schemas.ErrorResponse;
    }
  }
  namespace User$Id {
    namespace Parameters {
      export type Id = string; // uuid
    }
    export interface PathParameters {
      id: Parameters.Id /* uuid */;
    }
  }
  namespace User$IdList {
    namespace Parameters {
      export type Id = string; // uuid
    }
    export interface PathParameters {
      id: Parameters.Id /* uuid */;
    }
  }
  namespace UserDelete$Code {
    namespace Parameters {
      export type Code = string; // uuid
    }
    export interface PathParameters {
      code: Parameters.Code /* uuid */;
    }
  }
  namespace UserFollowsGroup$Id {
    namespace Parameters {
      export type Id = string; // uuid
    }
    export interface PathParameters {
      id: Parameters.Id /* uuid */;
    }
  }
  namespace UserFollowsList$Id {
    namespace Parameters {
      export type Id = string; // uuid
    }
    export interface PathParameters {
      id: Parameters.Id /* uuid */;
    }
  }
  namespace UserFollowsManga$Id {
    namespace Parameters {
      export type Id = string; // uuid
    }
    export interface PathParameters {
      id: Parameters.Id /* uuid */;
    }
  }
  namespace UserFollowsUser$Id {
    namespace Parameters {
      export type Id = string; // uuid
    }
    export interface PathParameters {
      id: Parameters.Id /* uuid */;
    }
  }
}

export interface OperationMethods {
  /**
   * get-ping - Ping healthcheck
   *
   * Returns a plaintext response containing only the word "pong" if the API is healthy
   */
  "get-ping": (
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetPing.Responses.$200>;
  /**
   * get-search-manga - Manga list
   *
   * Search a list of Manga.
   */
  "get-search-manga": (
    parameters?: Parameters<Paths.GetSearchManga.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetSearchManga.Responses.$200>;
  /**
   * post-manga - Create Manga
   *
   * Create a new Manga.
   */
  "post-manga": (
    parameters?: Parameters<Paths.PostManga.HeaderParameters> | null,
    data?: Paths.PostManga.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PostManga.Responses.$200>;
  /**
   * get-manga-aggregate - Get Manga volumes & chapters
   */
  "get-manga-aggregate": (
    parameters?: Parameters<
      Paths.GetMangaAggregate.QueryParameters &
        Paths.Manga$IdAggregate.PathParameters
    > | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetMangaAggregate.Responses.$200>;
  /**
   * get-manga-id - Get Manga
   *
   * Get Manga.
   */
  "get-manga-id": (
    parameters?: Parameters<
      Paths.GetMangaId.QueryParameters & Paths.Manga$Id.PathParameters
    > | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetMangaId.Responses.$200>;
  /**
   * put-manga-id - Update Manga
   */
  "put-manga-id": (
    parameters?: Parameters<
      Paths.PutMangaId.HeaderParameters & Paths.Manga$Id.PathParameters
    > | null,
    data?: Paths.PutMangaId.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PutMangaId.Responses.$200>;
  /**
   * delete-manga-id - Delete Manga
   */
  "delete-manga-id": (
    parameters?: Parameters<Paths.Manga$Id.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.DeleteMangaId.Responses.$200>;
  /**
   * post-auth-login - Login
   */
  "post-auth-login": (
    parameters?: Parameters<Paths.PostAuthLogin.HeaderParameters> | null,
    data?: Paths.PostAuthLogin.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PostAuthLogin.Responses.$200>;
  /**
   * get-auth-check - Check the set of permissions associated with the current token
   *
   * The returned list of permissions is computed depending on the generic role permissions that the token user has, their personal overrides, and the OpenID scopes of the token (we do not offer granular token permissions yet)
   *
   */
  "get-auth-check": (
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetAuthCheck.Responses.$200>;
  /**
   * post-auth-logout - Logout
   */
  "post-auth-logout": (
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PostAuthLogout.Responses.$200>;
  /**
   * post-auth-refresh - Refresh token
   */
  "post-auth-refresh": (
    parameters?: Parameters<Paths.PostAuthRefresh.HeaderParameters> | null,
    data?: Paths.PostAuthRefresh.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PostAuthRefresh.Responses.$200>;
  /**
   * get-list-apiclients - List own Api Clients
   */
  "get-list-apiclients": (
    parameters?: Parameters<Paths.GetListApiclients.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetListApiclients.Responses.$200>;
  /**
   * post-create-apiclient - Create ApiClient
   */
  "post-create-apiclient": (
    parameters?: Parameters<Paths.PostCreateApiclient.HeaderParameters> | null,
    data?: Paths.PostCreateApiclient.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PostCreateApiclient.Responses.$200>;
  /**
   * get-apiclient - Get Api Client by ID
   */
  "get-apiclient": (
    parameters?: Parameters<
      Paths.GetApiclient.QueryParameters & Paths.Client$Id.PathParameters
    > | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetApiclient.Responses.$200>;
  /**
   * post-edit-apiclient - Edit ApiClient
   */
  "post-edit-apiclient": (
    parameters?: Parameters<
      Paths.PostEditApiclient.HeaderParameters & Paths.Client$Id.PathParameters
    > | null,
    data?: Paths.PostEditApiclient.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PostEditApiclient.Responses.$200>;
  /**
   * delete-apiclient - Delete Api Client
   */
  "delete-apiclient": (
    parameters?: Parameters<
      Paths.DeleteApiclient.QueryParameters & Paths.Client$Id.PathParameters
    > | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.DeleteApiclient.Responses.$200>;
  /**
   * get-apiclient-secret - Get Secret for Client by ID
   */
  "get-apiclient-secret": (
    parameters?: Parameters<Paths.Client$IdSecret.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetApiclientSecret.Responses.$200>;
  /**
   * post-regenerate-apiclient-secret - Regenerate Client Secret
   */
  "post-regenerate-apiclient-secret": (
    parameters?: Parameters<
      Paths.PostRegenerateApiclientSecret.HeaderParameters &
        Paths.Client$IdSecret.PathParameters
    > | null,
    data?: Paths.PostRegenerateApiclientSecret.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PostRegenerateApiclientSecret.Responses.$200>;
  /**
   * get-search-group - Scanlation Group list
   */
  "get-search-group": (
    parameters?: Parameters<Paths.GetSearchGroup.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetSearchGroup.Responses.$200>;
  /**
   * post-group - Create Scanlation Group
   */
  "post-group": (
    parameters?: Parameters<Paths.PostGroup.HeaderParameters> | null,
    data?: Paths.PostGroup.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PostGroup.Responses.$200>;
  /**
   * get-group-id - Get Scanlation Group
   */
  "get-group-id": (
    parameters?: Parameters<
      Paths.GetGroupId.QueryParameters & Paths.Group$Id.PathParameters
    > | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetGroupId.Responses.$200>;
  /**
   * put-group-id - Update Scanlation Group
   */
  "put-group-id": (
    parameters?: Parameters<
      Paths.PutGroupId.HeaderParameters & Paths.Group$Id.PathParameters
    > | null,
    data?: Paths.PutGroupId.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PutGroupId.Responses.$200>;
  /**
   * delete-group-id - Delete Scanlation Group
   */
  "delete-group-id": (
    parameters?: Parameters<Paths.Group$Id.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.DeleteGroupId.Responses.$200>;
  /**
   * post-group-id-follow - Follow Scanlation Group
   */
  "post-group-id-follow": (
    parameters?: Parameters<Paths.Group$IdFollow.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PostGroupIdFollow.Responses.$200>;
  /**
   * delete-group-id-follow - Unfollow Scanlation Group
   */
  "delete-group-id-follow": (
    parameters?: Parameters<Paths.Group$IdFollow.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.DeleteGroupIdFollow.Responses.$200>;
  /**
   * post-list - Create CustomList
   */
  "post-list": (
    parameters?: Parameters<Paths.PostList.HeaderParameters> | null,
    data?: Paths.PostList.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PostList.Responses.$200>;
  /**
   * get-list-id - Get CustomList
   */
  "get-list-id": (
    parameters?: Parameters<Paths.List$Id.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetListId.Responses.$200>;
  /**
   * put-list-id - Update CustomList
   *
   * The size of the body is limited to 8KB.
   */
  "put-list-id": (
    parameters?: Parameters<
      Paths.PutListId.HeaderParameters & Paths.List$Id.PathParameters
    > | null,
    data?: Paths.PutListId.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PutListId.Responses.$200>;
  /**
   * delete-list-id - Delete CustomList
   */
  "delete-list-id": (
    parameters?: Parameters<Paths.List$Id.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.DeleteListId.Responses.$200>;
  /**
   * follow-list-id - Follow CustomList
   *
   * The request body is empty
   */
  "follow-list-id": (
    parameters?: Parameters<
      Paths.FollowListId.HeaderParameters & Paths.List$IdFollow.PathParameters
    > | null,
    data?: Paths.FollowListId.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.FollowListId.Responses.$200>;
  /**
   * unfollow-list-id - Unfollow CustomList
   *
   * The request body is empty
   */
  "unfollow-list-id": (
    parameters?: Parameters<Paths.List$IdFollow.PathParameters> | null,
    data?: Paths.UnfollowListId.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.UnfollowListId.Responses.$200>;
  /**
   * post-manga-id-list-listId - Add Manga in CustomList
   */
  "post-manga-id-list-listId": (
    parameters?: Parameters<Paths.Manga$IdList$ListId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PostMangaIdListListId.Responses.$200>;
  /**
   * delete-manga-id-list-listId - Remove Manga in CustomList
   */
  "delete-manga-id-list-listId": (
    parameters?: Parameters<Paths.Manga$IdList$ListId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.DeleteMangaIdListListId.Responses.$200>;
  /**
   * get-user-list - Get logged User CustomList list
   *
   * This will list public and private CustomList
   */
  "get-user-list": (
    parameters?: Parameters<Paths.GetUserList.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetUserList.Responses.$200>;
  /**
   * get-user-id-list - Get User's CustomList list
   *
   * This will list only public CustomList
   */
  "get-user-id-list": (
    parameters?: Parameters<
      Paths.GetUserIdList.QueryParameters & Paths.User$IdList.PathParameters
    > | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetUserIdList.Responses.$200>;
  /**
   * get-user - User list
   */
  "get-user": (
    parameters?: Parameters<Paths.GetUser.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetUser.Responses.$200>;
  /**
   * get-user-id - Get User
   */
  "get-user-id": (
    parameters?: Parameters<Paths.User$Id.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetUserId.Responses.$200>;
  /**
   * delete-user-id - Delete User
   */
  "delete-user-id": (
    parameters?: Parameters<Paths.User$Id.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.DeleteUserId.Responses.$200>;
  /**
   * post-user-delete-code - Approve User deletion
   */
  "post-user-delete-code": (
    parameters?: Parameters<Paths.UserDelete$Code.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PostUserDeleteCode.Responses.$200>;
  /**
   * get-chapter - Chapter list
   *
   * Chapter list. If you want the Chapters of a given Manga, please check the feed endpoints.
   */
  "get-chapter": (
    parameters?: Parameters<Paths.GetChapter.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetChapter.Responses.$200>;
  /**
   * get-chapter-id - Get Chapter
   */
  "get-chapter-id": (
    parameters?: Parameters<
      Paths.GetChapterId.QueryParameters & Paths.Chapter$Id.PathParameters
    > | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetChapterId.Responses.$200>;
  /**
   * put-chapter-id - Update Chapter
   */
  "put-chapter-id": (
    parameters?: Parameters<
      Paths.PutChapterId.HeaderParameters & Paths.Chapter$Id.PathParameters
    > | null,
    data?: Paths.PutChapterId.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PutChapterId.Responses.$200>;
  /**
   * delete-chapter-id - Delete Chapter
   */
  "delete-chapter-id": (
    parameters?: Parameters<Paths.Chapter$Id.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.DeleteChapterId.Responses.$200>;
  /**
   * get-user-follows-manga-feed - Get logged User followed Manga feed (Chapter list)
   */
  "get-user-follows-manga-feed": (
    parameters?: Parameters<Paths.GetUserFollowsMangaFeed.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetUserFollowsMangaFeed.Responses.$200>;
  /**
   * get-list-id-feed - CustomList Manga feed
   */
  "get-list-id-feed": (
    parameters?: Parameters<
      Paths.GetListIdFeed.QueryParameters & Paths.List$IdFeed.PathParameters
    > | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetListIdFeed.Responses.$200>;
  /**
   * post-manga-id-follow - Follow Manga
   */
  "post-manga-id-follow": (
    parameters?: Parameters<Paths.Manga$IdFollow.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PostMangaIdFollow.Responses.$200>;
  /**
   * delete-manga-id-follow - Unfollow Manga
   */
  "delete-manga-id-follow": (
    parameters?: Parameters<Paths.Manga$IdFollow.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.DeleteMangaIdFollow.Responses.$200>;
  /**
   * get-cover - CoverArt list
   */
  "get-cover": (
    parameters?: Parameters<Paths.GetCover.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetCover.Responses.$200>;
  /**
   * get-cover-id - Get Cover
   */
  "get-cover-id": (
    parameters?: Parameters<
      Paths.GetCoverId.QueryParameters &
        Paths.Cover$MangaOrCoverId.PathParameters
    > | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetCoverId.Responses.$200>;
  /**
   * edit-cover - Edit Cover
   */
  "edit-cover": (
    parameters?: Parameters<
      Paths.EditCover.HeaderParameters &
        Paths.Cover$MangaOrCoverId.PathParameters
    > | null,
    data?: Paths.EditCover.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.EditCover.Responses.$200>;
  /**
   * upload-cover - Upload Cover
   */
  "upload-cover": (
    parameters?: Parameters<
      Paths.UploadCover.HeaderParameters &
        Paths.Cover$MangaOrCoverId.PathParameters
    > | null,
    data?: Paths.UploadCover.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.UploadCover.Responses.$200>;
  /**
   * delete-cover - Delete Cover
   */
  "delete-cover": (
    parameters?: Parameters<Paths.Cover$MangaOrCoverId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.DeleteCover.Responses.$200>;
  /**
   * get-author - Author list
   */
  "get-author": (
    parameters?: Parameters<Paths.GetAuthor.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetAuthor.Responses.$200>;
  /**
   * post-author - Create Author
   */
  "post-author": (
    parameters?: Parameters<Paths.PostAuthor.HeaderParameters> | null,
    data?: Paths.PostAuthor.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PostAuthor.Responses.$200>;
  /**
   * get-author-id - Get Author
   */
  "get-author-id": (
    parameters?: Parameters<
      Paths.GetAuthorId.QueryParameters & Paths.Author$Id.PathParameters
    > | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetAuthorId.Responses.$200>;
  /**
   * put-author-id - Update Author
   */
  "put-author-id": (
    parameters?: Parameters<
      Paths.PutAuthorId.HeaderParameters & Paths.Author$Id.PathParameters
    > | null,
    data?: Paths.PutAuthorId.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PutAuthorId.Responses.$200>;
  /**
   * delete-author-id - Delete Author
   */
  "delete-author-id": (
    parameters?: Parameters<Paths.Author$Id.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.DeleteAuthorId.Responses.$200>;
  /**
   * post-legacy-mapping - Legacy ID mapping
   */
  "post-legacy-mapping": (
    parameters?: Parameters<Paths.PostLegacyMapping.HeaderParameters> | null,
    data?: Paths.PostLegacyMapping.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PostLegacyMapping.Responses.$200>;
  /**
   * get-manga-id-feed - Manga feed
   */
  "get-manga-id-feed": (
    parameters?: Parameters<
      Paths.GetMangaIdFeed.QueryParameters & Paths.Manga$IdFeed.PathParameters
    > | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetMangaIdFeed.Responses.$200>;
  /**
   * get-manga-chapter-readmarkers - Manga read markers
   *
   * A list of chapter ids that are marked as read for the specified manga
   */
  "get-manga-chapter-readmarkers": (
    parameters?: Parameters<Paths.Manga$IdRead.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetMangaChapterReadmarkers.Responses.$200>;
  /**
   * post-manga-chapter-readmarkers - Manga read markers batch
   *
   * Send a lot of chapter ids for one manga to mark as read and/or unread
   */
  "post-manga-chapter-readmarkers": (
    parameters?: Parameters<
      Paths.PostMangaChapterReadmarkers.QueryParameters &
        Paths.Manga$IdRead.PathParameters
    > | null,
    data?: Paths.PostMangaChapterReadmarkers.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PostMangaChapterReadmarkers.Responses.$200>;
  /**
   * get-manga-chapter-readmarkers-2 - Manga read markers
   *
   * A list of chapter ids that are marked as read for the given manga ids
   */
  "get-manga-chapter-readmarkers-2": (
    parameters?: Parameters<Paths.GetMangaChapterReadmarkers2.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetMangaChapterReadmarkers2.Responses.$200>;
  /**
   * get-manga-random - Get a random Manga
   */
  "get-manga-random": (
    parameters?: Parameters<Paths.GetMangaRandom.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetMangaRandom.Responses.$200>;
  /**
   * get-at-home-server-chapterId - Get MangaDex@Home server URL
   */
  "get-at-home-server-chapterId": (
    parameters?: Parameters<
      Paths.GetAtHomeServerChapterId.QueryParameters &
        Paths.AtHomeServer$ChapterId.PathParameters
    > | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetAtHomeServerChapterId.Responses.$200>;
  /**
   * get-manga-tag - Tag list
   */
  "get-manga-tag": (
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetMangaTag.Responses.$200>;
  /**
   * get-user-me - Logged User details
   */
  "get-user-me": (
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetUserMe.Responses.$200>;
  /**
   * get-user-follows-group - Get logged User followed Groups
   */
  "get-user-follows-group": (
    parameters?: Parameters<Paths.GetUserFollowsGroup.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetUserFollowsGroup.Responses.$200>;
  /**
   * get-user-follows-group-id - Check if logged User follows a Group
   */
  "get-user-follows-group-id": (
    parameters?: Parameters<Paths.UserFollowsGroup$Id.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetUserFollowsGroupId.Responses.$200>;
  /**
   * get-user-follows-user - Get logged User followed User list
   */
  "get-user-follows-user": (
    parameters?: Parameters<Paths.GetUserFollowsUser.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetUserFollowsUser.Responses.$200>;
  /**
   * get-user-follows-user-id - Check if logged User follows a User
   */
  "get-user-follows-user-id": (
    parameters?: Parameters<Paths.UserFollowsUser$Id.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetUserFollowsUserId.Responses.$200>;
  /**
   * get-user-follows-manga - Get logged User followed Manga list
   */
  "get-user-follows-manga": (
    parameters?: Parameters<Paths.GetUserFollowsManga.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetUserFollowsManga.Responses.$200>;
  /**
   * get-user-follows-manga-id - Check if logged User follows a Manga
   */
  "get-user-follows-manga-id": (
    parameters?: Parameters<Paths.UserFollowsManga$Id.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetUserFollowsMangaId.Responses.$200>;
  /**
   * get-user-follows-list - Get logged User followed CustomList list
   */
  "get-user-follows-list": (
    parameters?: Parameters<Paths.GetUserFollowsList.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetUserFollowsList.Responses.$200>;
  /**
   * get-user-follows-list-id - Check if logged User follows a CustomList
   */
  "get-user-follows-list-id": (
    parameters?: Parameters<Paths.UserFollowsList$Id.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetUserFollowsListId.Responses.$200>;
  /**
   * get-manga-status - Get all Manga reading status for logged User
   */
  "get-manga-status": (
    parameters?: Parameters<Paths.GetMangaStatus.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetMangaStatus.Responses.$200>;
  /**
   * get-manga-id-status - Get a Manga reading status
   */
  "get-manga-id-status": (
    parameters?: Parameters<Paths.Manga$IdStatus.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetMangaIdStatus.Responses.$200>;
  /**
   * post-manga-id-status - Update Manga reading status
   */
  "post-manga-id-status": (
    parameters?: Parameters<
      Paths.PostMangaIdStatus.HeaderParameters &
        Paths.Manga$IdStatus.PathParameters
    > | null,
    data?: Paths.PostMangaIdStatus.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PostMangaIdStatus.Responses.$200>;
  /**
   * get-manga-id-draft - Get a specific Manga Draft
   */
  "get-manga-id-draft": (
    parameters?: Parameters<
      Paths.MangaDraft$Id.QueryParameters & Paths.MangaDraft$Id.PathParameters
    > | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetMangaIdDraft.Responses.$200>;
  /**
   * commit-manga-draft - Submit a Manga Draft
   */
  "commit-manga-draft": (
    parameters?: Parameters<Paths.MangaDraft$IdCommit.PathParameters> | null,
    data?: Paths.CommitMangaDraft.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.CommitMangaDraft.Responses.$201>;
  /**
   * get-manga-drafts - Get a list of Manga Drafts
   */
  "get-manga-drafts": (
    parameters?: Parameters<Paths.MangaDraft.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetMangaDrafts.Responses.$200>;
  /**
   * post-captcha-solve - Solve Captcha
   *
   * Captchas can be solved explicitly through this endpoint, another way is to add a `X-Captcha-Result` header to any request. The same logic will verify the captcha and is probably more convenient because it takes one less request.
   *
   * Authentication is optional. Captchas are tracked for both the client ip and for the user id, if you are logged in you want to send your session token but that is not required.
   */
  "post-captcha-solve": (
    parameters?: Parameters<Paths.PostCaptchaSolve.HeaderParameters> | null,
    data?: Paths.PostCaptchaSolve.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PostCaptchaSolve.Responses.$200>;
  /**
   * get-report-reasons-by-category - Get a list of report reasons
   */
  "get-report-reasons-by-category": (
    parameters?: Parameters<Paths.ReportReasons$Category.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetReportReasonsByCategory.Responses.$200>;
  /**
   * get-reports - Get a list of reports by the user
   */
  "get-reports": (
    parameters?: Parameters<Paths.GetReports.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetReports.Responses.$200>;
  /**
   * post-report - Create a new Report
   */
  "post-report": (
    parameters?: Parameters<Paths.PostReport.HeaderParameters> | null,
    data?: Paths.PostReport.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PostReport.Responses.$201>;
  /**
   * get-upload-session - Get the current User upload session
   */
  "get-upload-session": (
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetUploadSession.Responses.$200>;
  /**
   * begin-upload-session - Start an upload session
   */
  "begin-upload-session": (
    parameters?: Parameters<Paths.BeginUploadSession.HeaderParameters> | null,
    data?: Paths.BeginUploadSession.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.BeginUploadSession.Responses.$200>;
  /**
   * begin-edit-session - Start an edit chapter session
   */
  "begin-edit-session": (
    parameters?: Parameters<
      Paths.BeginEditSession.HeaderParameters &
        Paths.UploadBegin$ChapterId.PathParameters
    > | null,
    data?: Paths.BeginEditSession.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.BeginEditSession.Responses.$200>;
  /**
   * put-upload-session-file - Upload images to the upload session
   */
  "put-upload-session-file": (
    parameters?: Parameters<
      Paths.PutUploadSessionFile.HeaderParameters &
        Paths.Upload$UploadSessionId.PathParameters
    > | null,
    data?: Paths.PutUploadSessionFile.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PutUploadSessionFile.Responses.$200>;
  /**
   * abandon-upload-session - Abandon upload session
   */
  "abandon-upload-session": (
    parameters?: Parameters<Paths.Upload$UploadSessionId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.AbandonUploadSession.Responses.$200>;
  /**
   * commit-upload-session - Commit the upload session and specify chapter data
   */
  "commit-upload-session": (
    parameters?: Parameters<
      Paths.CommitUploadSession.HeaderParameters &
        Paths.Upload$UploadSessionIdCommit.PathParameters
    > | null,
    data?: Paths.CommitUploadSession.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.CommitUploadSession.Responses.$200>;
  /**
   * delete-uploaded-session-file - Delete an uploaded image from the Upload Session
   */
  "delete-uploaded-session-file": (
    parameters?: Parameters<Paths.Upload$UploadSessionId$UploadSessionFileId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.DeleteUploadedSessionFile.Responses.$200>;
  /**
   * delete-uploaded-session-files - Delete a set of uploaded images from the Upload Session
   */
  "delete-uploaded-session-files": (
    parameters?: Parameters<
      Paths.DeleteUploadedSessionFiles.HeaderParameters &
        Paths.Upload$UploadSessionIdBatch.PathParameters
    > | null,
    data?: Paths.DeleteUploadedSessionFiles.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.DeleteUploadedSessionFiles.Responses.$200>;
  /**
   * upload-check-approval-required - Check if a given manga / locale for a User needs moderation approval
   */
  "upload-check-approval-required": (
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UploadCheckApprovalRequired.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.UploadCheckApprovalRequired.Responses.$200>;
  /**
   * get-manga-relation - Manga relation list
   */
  "get-manga-relation": (
    parameters?: Parameters<
      Paths.GetMangaRelation.QueryParameters &
        Paths.Manga$MangaIdRelation.PathParameters
    > | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetMangaRelation.Responses.$200>;
  /**
   * post-manga-relation - Create Manga relation
   *
   * Create a new Manga relation.
   */
  "post-manga-relation": (
    parameters?: Parameters<
      Paths.PostMangaRelation.HeaderParameters &
        Paths.Manga$MangaIdRelation.PathParameters
    > | null,
    data?: Paths.PostMangaRelation.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PostMangaRelation.Responses.$200>;
  /**
   * delete-manga-relation-id - Delete Manga relation
   */
  "delete-manga-relation-id": (
    parameters?: Parameters<Paths.Manga$MangaIdRelation$Id.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.DeleteMangaRelationId.Responses.$200>;
  /**
   * get-rating - Get your ratings
   */
  "get-rating": (
    parameters?: Parameters<Paths.GetRating.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetRating.Responses.$200>;
  /**
   * post-rating-manga-id - Create or update Manga rating
   */
  "post-rating-manga-id": (
    parameters?: Parameters<Paths.Rating$MangaId.PathParameters> | null,
    data?: Paths.PostRatingMangaId.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PostRatingMangaId.Responses.$200>;
  /**
   * delete-rating-manga-id - Delete Manga rating
   */
  "delete-rating-manga-id": (
    parameters?: Parameters<Paths.Rating$MangaId.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.DeleteRatingMangaId.Responses.$200>;
  /**
   * get-statistics-chapter-uuid - Get statistics about given chapter
   */
  "get-statistics-chapter-uuid": (
    parameters?: Parameters<Paths.GetStatisticsChapterUuid.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetStatisticsChapterUuid.Responses.$200>;
  /**
   * get-statistics-chapters - Get statistics about given chapters
   */
  "get-statistics-chapters": (
    parameters?: Parameters<Paths.GetStatisticsChapters.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetStatisticsChapters.Responses.$200>;
  /**
   * get-statistics-group-uuid - Get statistics about given scanlation group
   */
  "get-statistics-group-uuid": (
    parameters?: Parameters<Paths.GetStatisticsGroupUuid.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetStatisticsGroupUuid.Responses.$200>;
  /**
   * get-statistics-groups - Get statistics about given groups
   */
  "get-statistics-groups": (
    parameters?: Parameters<Paths.GetStatisticsGroups.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetStatisticsGroups.Responses.$200>;
  /**
   * get-statistics-manga-uuid - Get statistics about given Manga
   */
  "get-statistics-manga-uuid": (
    parameters?: Parameters<Paths.GetStatisticsMangaUuid.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetStatisticsMangaUuid.Responses.$200>;
  /**
   * get-statistics-manga - Find statistics about given Manga
   */
  "get-statistics-manga": (
    parameters?: Parameters<Paths.GetStatisticsManga.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetStatisticsManga.Responses.$200>;
  /**
   * get-settings-template - Get latest Settings template
   */
  "get-settings-template": (
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetSettingsTemplate.Responses.$200>;
  /**
   * post-settings-template - Create Settings template
   */
  "post-settings-template": (
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PostSettingsTemplate.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PostSettingsTemplate.Responses.$200>;
  /**
   * get-settings-template-version - Get Settings template by version id
   */
  "get-settings-template-version": (
    parameters?: Parameters<Paths.GetSettingsTemplateVersion.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetSettingsTemplateVersion.Responses.$200>;
  /**
   * get-settings - Get an User Settings
   */
  "get-settings": (
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetSettings.Responses.$200>;
  /**
   * post-settings - Create or update an User Settings
   */
  "post-settings": (
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PostSettings.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.PostSettings.Responses.$200>;
  /**
   * get-reading-history - Get users reading history
   */
  "get-reading-history": (
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.GetReadingHistory.Responses.$200>;
  /**
   * forums-thread-create - Create forums thread
   *
   * Creates a thread in the forums for the given resource, which backs the comments functionality.
   * A thread is only created if it doesn't exist yet; otherwise the preexisting thread is returned.
   *
   */
  "forums-thread-create": (
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ForumsThreadCreate.RequestBody,
    config?: AxiosRequestConfig,
  ) => OperationResponse<Paths.ForumsThreadCreate.Responses.$200>;
}

export interface PathsDictionary {
  ["/ping"]: {
    /**
     * get-ping - Ping healthcheck
     *
     * Returns a plaintext response containing only the word "pong" if the API is healthy
     */
    get: (
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetPing.Responses.$200>;
  };
  ["/manga"]: {
    /**
     * get-search-manga - Manga list
     *
     * Search a list of Manga.
     */
    get: (
      parameters?: Parameters<Paths.GetSearchManga.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetSearchManga.Responses.$200>;
    /**
     * post-manga - Create Manga
     *
     * Create a new Manga.
     */
    post: (
      parameters?: Parameters<Paths.PostManga.HeaderParameters> | null,
      data?: Paths.PostManga.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PostManga.Responses.$200>;
  };
  ["/manga/{id}/aggregate"]: {
    /**
     * get-manga-aggregate - Get Manga volumes & chapters
     */
    get: (
      parameters?: Parameters<
        Paths.GetMangaAggregate.QueryParameters &
          Paths.Manga$IdAggregate.PathParameters
      > | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetMangaAggregate.Responses.$200>;
  };
  ["/manga/{id}"]: {
    /**
     * get-manga-id - Get Manga
     *
     * Get Manga.
     */
    get: (
      parameters?: Parameters<
        Paths.GetMangaId.QueryParameters & Paths.Manga$Id.PathParameters
      > | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetMangaId.Responses.$200>;
    /**
     * put-manga-id - Update Manga
     */
    put: (
      parameters?: Parameters<
        Paths.PutMangaId.HeaderParameters & Paths.Manga$Id.PathParameters
      > | null,
      data?: Paths.PutMangaId.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PutMangaId.Responses.$200>;
    /**
     * delete-manga-id - Delete Manga
     */
    delete: (
      parameters?: Parameters<Paths.Manga$Id.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.DeleteMangaId.Responses.$200>;
  };
  ["/auth/login"]: {
    /**
     * post-auth-login - Login
     */
    post: (
      parameters?: Parameters<Paths.PostAuthLogin.HeaderParameters> | null,
      data?: Paths.PostAuthLogin.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PostAuthLogin.Responses.$200>;
  };
  ["/auth/check"]: {
    /**
     * get-auth-check - Check the set of permissions associated with the current token
     *
     * The returned list of permissions is computed depending on the generic role permissions that the token user has, their personal overrides, and the OpenID scopes of the token (we do not offer granular token permissions yet)
     *
     */
    get: (
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetAuthCheck.Responses.$200>;
  };
  ["/auth/logout"]: {
    /**
     * post-auth-logout - Logout
     */
    post: (
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PostAuthLogout.Responses.$200>;
  };
  ["/auth/refresh"]: {
    /**
     * post-auth-refresh - Refresh token
     */
    post: (
      parameters?: Parameters<Paths.PostAuthRefresh.HeaderParameters> | null,
      data?: Paths.PostAuthRefresh.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PostAuthRefresh.Responses.$200>;
  };
  ["/client"]: {
    /**
     * get-list-apiclients - List own Api Clients
     */
    get: (
      parameters?: Parameters<Paths.GetListApiclients.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetListApiclients.Responses.$200>;
    /**
     * post-create-apiclient - Create ApiClient
     */
    post: (
      parameters?: Parameters<Paths.PostCreateApiclient.HeaderParameters> | null,
      data?: Paths.PostCreateApiclient.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PostCreateApiclient.Responses.$200>;
  };
  ["/client/{id}"]: {
    /**
     * get-apiclient - Get Api Client by ID
     */
    get: (
      parameters?: Parameters<
        Paths.GetApiclient.QueryParameters & Paths.Client$Id.PathParameters
      > | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetApiclient.Responses.$200>;
    /**
     * post-edit-apiclient - Edit ApiClient
     */
    post: (
      parameters?: Parameters<
        Paths.PostEditApiclient.HeaderParameters &
          Paths.Client$Id.PathParameters
      > | null,
      data?: Paths.PostEditApiclient.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PostEditApiclient.Responses.$200>;
    /**
     * delete-apiclient - Delete Api Client
     */
    delete: (
      parameters?: Parameters<
        Paths.DeleteApiclient.QueryParameters & Paths.Client$Id.PathParameters
      > | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.DeleteApiclient.Responses.$200>;
  };
  ["/client/{id}/secret"]: {
    /**
     * get-apiclient-secret - Get Secret for Client by ID
     */
    get: (
      parameters?: Parameters<Paths.Client$IdSecret.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetApiclientSecret.Responses.$200>;
    /**
     * post-regenerate-apiclient-secret - Regenerate Client Secret
     */
    post: (
      parameters?: Parameters<
        Paths.PostRegenerateApiclientSecret.HeaderParameters &
          Paths.Client$IdSecret.PathParameters
      > | null,
      data?: Paths.PostRegenerateApiclientSecret.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PostRegenerateApiclientSecret.Responses.$200>;
  };
  ["/group"]: {
    /**
     * get-search-group - Scanlation Group list
     */
    get: (
      parameters?: Parameters<Paths.GetSearchGroup.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetSearchGroup.Responses.$200>;
    /**
     * post-group - Create Scanlation Group
     */
    post: (
      parameters?: Parameters<Paths.PostGroup.HeaderParameters> | null,
      data?: Paths.PostGroup.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PostGroup.Responses.$200>;
  };
  ["/group/{id}"]: {
    /**
     * get-group-id - Get Scanlation Group
     */
    get: (
      parameters?: Parameters<
        Paths.GetGroupId.QueryParameters & Paths.Group$Id.PathParameters
      > | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetGroupId.Responses.$200>;
    /**
     * put-group-id - Update Scanlation Group
     */
    put: (
      parameters?: Parameters<
        Paths.PutGroupId.HeaderParameters & Paths.Group$Id.PathParameters
      > | null,
      data?: Paths.PutGroupId.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PutGroupId.Responses.$200>;
    /**
     * delete-group-id - Delete Scanlation Group
     */
    delete: (
      parameters?: Parameters<Paths.Group$Id.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.DeleteGroupId.Responses.$200>;
  };
  ["/group/{id}/follow"]: {
    /**
     * post-group-id-follow - Follow Scanlation Group
     */
    post: (
      parameters?: Parameters<Paths.Group$IdFollow.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PostGroupIdFollow.Responses.$200>;
    /**
     * delete-group-id-follow - Unfollow Scanlation Group
     */
    delete: (
      parameters?: Parameters<Paths.Group$IdFollow.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.DeleteGroupIdFollow.Responses.$200>;
  };
  ["/list"]: {
    /**
     * post-list - Create CustomList
     */
    post: (
      parameters?: Parameters<Paths.PostList.HeaderParameters> | null,
      data?: Paths.PostList.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PostList.Responses.$200>;
  };
  ["/list/{id}"]: {
    /**
     * get-list-id - Get CustomList
     */
    get: (
      parameters?: Parameters<Paths.List$Id.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetListId.Responses.$200>;
    /**
     * put-list-id - Update CustomList
     *
     * The size of the body is limited to 8KB.
     */
    put: (
      parameters?: Parameters<
        Paths.PutListId.HeaderParameters & Paths.List$Id.PathParameters
      > | null,
      data?: Paths.PutListId.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PutListId.Responses.$200>;
    /**
     * delete-list-id - Delete CustomList
     */
    delete: (
      parameters?: Parameters<Paths.List$Id.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.DeleteListId.Responses.$200>;
  };
  ["/list/{id}/follow"]: {
    /**
     * follow-list-id - Follow CustomList
     *
     * The request body is empty
     */
    post: (
      parameters?: Parameters<
        Paths.FollowListId.HeaderParameters & Paths.List$IdFollow.PathParameters
      > | null,
      data?: Paths.FollowListId.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.FollowListId.Responses.$200>;
    /**
     * unfollow-list-id - Unfollow CustomList
     *
     * The request body is empty
     */
    delete: (
      parameters?: Parameters<Paths.List$IdFollow.PathParameters> | null,
      data?: Paths.UnfollowListId.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.UnfollowListId.Responses.$200>;
  };
  ["/manga/{id}/list/{listId}"]: {
    /**
     * post-manga-id-list-listId - Add Manga in CustomList
     */
    post: (
      parameters?: Parameters<Paths.Manga$IdList$ListId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PostMangaIdListListId.Responses.$200>;
    /**
     * delete-manga-id-list-listId - Remove Manga in CustomList
     */
    delete: (
      parameters?: Parameters<Paths.Manga$IdList$ListId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.DeleteMangaIdListListId.Responses.$200>;
  };
  ["/user/list"]: {
    /**
     * get-user-list - Get logged User CustomList list
     *
     * This will list public and private CustomList
     */
    get: (
      parameters?: Parameters<Paths.GetUserList.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetUserList.Responses.$200>;
  };
  ["/user/{id}/list"]: {
    /**
     * get-user-id-list - Get User's CustomList list
     *
     * This will list only public CustomList
     */
    get: (
      parameters?: Parameters<
        Paths.GetUserIdList.QueryParameters & Paths.User$IdList.PathParameters
      > | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetUserIdList.Responses.$200>;
  };
  ["/user"]: {
    /**
     * get-user - User list
     */
    get: (
      parameters?: Parameters<Paths.GetUser.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetUser.Responses.$200>;
  };
  ["/user/{id}"]: {
    /**
     * get-user-id - Get User
     */
    get: (
      parameters?: Parameters<Paths.User$Id.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetUserId.Responses.$200>;
    /**
     * delete-user-id - Delete User
     */
    delete: (
      parameters?: Parameters<Paths.User$Id.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.DeleteUserId.Responses.$200>;
  };
  ["/user/delete/{code}"]: {
    /**
     * post-user-delete-code - Approve User deletion
     */
    post: (
      parameters?: Parameters<Paths.UserDelete$Code.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PostUserDeleteCode.Responses.$200>;
  };
  ["/chapter"]: {
    /**
     * get-chapter - Chapter list
     *
     * Chapter list. If you want the Chapters of a given Manga, please check the feed endpoints.
     */
    get: (
      parameters?: Parameters<Paths.GetChapter.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetChapter.Responses.$200>;
  };
  ["/chapter/{id}"]: {
    /**
     * get-chapter-id - Get Chapter
     */
    get: (
      parameters?: Parameters<
        Paths.GetChapterId.QueryParameters & Paths.Chapter$Id.PathParameters
      > | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetChapterId.Responses.$200>;
    /**
     * put-chapter-id - Update Chapter
     */
    put: (
      parameters?: Parameters<
        Paths.PutChapterId.HeaderParameters & Paths.Chapter$Id.PathParameters
      > | null,
      data?: Paths.PutChapterId.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PutChapterId.Responses.$200>;
    /**
     * delete-chapter-id - Delete Chapter
     */
    delete: (
      parameters?: Parameters<Paths.Chapter$Id.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.DeleteChapterId.Responses.$200>;
  };
  ["/user/follows/manga/feed"]: {
    /**
     * get-user-follows-manga-feed - Get logged User followed Manga feed (Chapter list)
     */
    get: (
      parameters?: Parameters<Paths.GetUserFollowsMangaFeed.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetUserFollowsMangaFeed.Responses.$200>;
  };
  ["/list/{id}/feed"]: {
    /**
     * get-list-id-feed - CustomList Manga feed
     */
    get: (
      parameters?: Parameters<
        Paths.GetListIdFeed.QueryParameters & Paths.List$IdFeed.PathParameters
      > | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetListIdFeed.Responses.$200>;
  };
  ["/manga/{id}/follow"]: {
    /**
     * delete-manga-id-follow - Unfollow Manga
     */
    delete: (
      parameters?: Parameters<Paths.Manga$IdFollow.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.DeleteMangaIdFollow.Responses.$200>;
    /**
     * post-manga-id-follow - Follow Manga
     */
    post: (
      parameters?: Parameters<Paths.Manga$IdFollow.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PostMangaIdFollow.Responses.$200>;
  };
  ["/cover"]: {
    /**
     * get-cover - CoverArt list
     */
    get: (
      parameters?: Parameters<Paths.GetCover.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetCover.Responses.$200>;
  };
  ["/cover/{mangaOrCoverId}"]: {
    /**
     * upload-cover - Upload Cover
     */
    post: (
      parameters?: Parameters<
        Paths.UploadCover.HeaderParameters &
          Paths.Cover$MangaOrCoverId.PathParameters
      > | null,
      data?: Paths.UploadCover.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.UploadCover.Responses.$200>;
    /**
     * get-cover-id - Get Cover
     */
    get: (
      parameters?: Parameters<
        Paths.GetCoverId.QueryParameters &
          Paths.Cover$MangaOrCoverId.PathParameters
      > | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetCoverId.Responses.$200>;
    /**
     * edit-cover - Edit Cover
     */
    put: (
      parameters?: Parameters<
        Paths.EditCover.HeaderParameters &
          Paths.Cover$MangaOrCoverId.PathParameters
      > | null,
      data?: Paths.EditCover.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.EditCover.Responses.$200>;
    /**
     * delete-cover - Delete Cover
     */
    delete: (
      parameters?: Parameters<Paths.Cover$MangaOrCoverId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.DeleteCover.Responses.$200>;
  };
  ["/author"]: {
    /**
     * get-author - Author list
     */
    get: (
      parameters?: Parameters<Paths.GetAuthor.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetAuthor.Responses.$200>;
    /**
     * post-author - Create Author
     */
    post: (
      parameters?: Parameters<Paths.PostAuthor.HeaderParameters> | null,
      data?: Paths.PostAuthor.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PostAuthor.Responses.$200>;
  };
  ["/author/{id}"]: {
    /**
     * get-author-id - Get Author
     */
    get: (
      parameters?: Parameters<
        Paths.GetAuthorId.QueryParameters & Paths.Author$Id.PathParameters
      > | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetAuthorId.Responses.$200>;
    /**
     * put-author-id - Update Author
     */
    put: (
      parameters?: Parameters<
        Paths.PutAuthorId.HeaderParameters & Paths.Author$Id.PathParameters
      > | null,
      data?: Paths.PutAuthorId.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PutAuthorId.Responses.$200>;
    /**
     * delete-author-id - Delete Author
     */
    delete: (
      parameters?: Parameters<Paths.Author$Id.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.DeleteAuthorId.Responses.$200>;
  };
  ["/legacy/mapping"]: {
    /**
     * post-legacy-mapping - Legacy ID mapping
     */
    post: (
      parameters?: Parameters<Paths.PostLegacyMapping.HeaderParameters> | null,
      data?: Paths.PostLegacyMapping.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PostLegacyMapping.Responses.$200>;
  };
  ["/manga/{id}/feed"]: {
    /**
     * get-manga-id-feed - Manga feed
     */
    get: (
      parameters?: Parameters<
        Paths.GetMangaIdFeed.QueryParameters & Paths.Manga$IdFeed.PathParameters
      > | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetMangaIdFeed.Responses.$200>;
  };
  ["/manga/{id}/read"]: {
    /**
     * get-manga-chapter-readmarkers - Manga read markers
     *
     * A list of chapter ids that are marked as read for the specified manga
     */
    get: (
      parameters?: Parameters<Paths.Manga$IdRead.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetMangaChapterReadmarkers.Responses.$200>;
    /**
     * post-manga-chapter-readmarkers - Manga read markers batch
     *
     * Send a lot of chapter ids for one manga to mark as read and/or unread
     */
    post: (
      parameters?: Parameters<
        Paths.PostMangaChapterReadmarkers.QueryParameters &
          Paths.Manga$IdRead.PathParameters
      > | null,
      data?: Paths.PostMangaChapterReadmarkers.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PostMangaChapterReadmarkers.Responses.$200>;
  };
  ["/manga/read"]: {
    /**
     * get-manga-chapter-readmarkers-2 - Manga read markers
     *
     * A list of chapter ids that are marked as read for the given manga ids
     */
    get: (
      parameters?: Parameters<Paths.GetMangaChapterReadmarkers2.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetMangaChapterReadmarkers2.Responses.$200>;
  };
  ["/manga/random"]: {
    /**
     * get-manga-random - Get a random Manga
     */
    get: (
      parameters?: Parameters<Paths.GetMangaRandom.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetMangaRandom.Responses.$200>;
  };
  ["/at-home/server/{chapterId}"]: {
    /**
     * get-at-home-server-chapterId - Get MangaDex@Home server URL
     */
    get: (
      parameters?: Parameters<
        Paths.GetAtHomeServerChapterId.QueryParameters &
          Paths.AtHomeServer$ChapterId.PathParameters
      > | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetAtHomeServerChapterId.Responses.$200>;
  };
  ["/manga/tag"]: {
    /**
     * get-manga-tag - Tag list
     */
    get: (
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetMangaTag.Responses.$200>;
  };
  ["/user/me"]: {
    /**
     * get-user-me - Logged User details
     */
    get: (
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetUserMe.Responses.$200>;
  };
  ["/user/follows/group"]: {
    /**
     * get-user-follows-group - Get logged User followed Groups
     */
    get: (
      parameters?: Parameters<Paths.GetUserFollowsGroup.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetUserFollowsGroup.Responses.$200>;
  };
  ["/user/follows/group/{id}"]: {
    /**
     * get-user-follows-group-id - Check if logged User follows a Group
     */
    get: (
      parameters?: Parameters<Paths.UserFollowsGroup$Id.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetUserFollowsGroupId.Responses.$200>;
  };
  ["/user/follows/user"]: {
    /**
     * get-user-follows-user - Get logged User followed User list
     */
    get: (
      parameters?: Parameters<Paths.GetUserFollowsUser.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetUserFollowsUser.Responses.$200>;
  };
  ["/user/follows/user/{id}"]: {
    /**
     * get-user-follows-user-id - Check if logged User follows a User
     */
    get: (
      parameters?: Parameters<Paths.UserFollowsUser$Id.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetUserFollowsUserId.Responses.$200>;
  };
  ["/user/follows/manga"]: {
    /**
     * get-user-follows-manga - Get logged User followed Manga list
     */
    get: (
      parameters?: Parameters<Paths.GetUserFollowsManga.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetUserFollowsManga.Responses.$200>;
  };
  ["/user/follows/manga/{id}"]: {
    /**
     * get-user-follows-manga-id - Check if logged User follows a Manga
     */
    get: (
      parameters?: Parameters<Paths.UserFollowsManga$Id.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetUserFollowsMangaId.Responses.$200>;
  };
  ["/user/follows/list"]: {
    /**
     * get-user-follows-list - Get logged User followed CustomList list
     */
    get: (
      parameters?: Parameters<Paths.GetUserFollowsList.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetUserFollowsList.Responses.$200>;
  };
  ["/user/follows/list/{id}"]: {
    /**
     * get-user-follows-list-id - Check if logged User follows a CustomList
     */
    get: (
      parameters?: Parameters<Paths.UserFollowsList$Id.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetUserFollowsListId.Responses.$200>;
  };
  ["/manga/status"]: {
    /**
     * get-manga-status - Get all Manga reading status for logged User
     */
    get: (
      parameters?: Parameters<Paths.GetMangaStatus.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetMangaStatus.Responses.$200>;
  };
  ["/manga/{id}/status"]: {
    /**
     * get-manga-id-status - Get a Manga reading status
     */
    get: (
      parameters?: Parameters<Paths.Manga$IdStatus.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetMangaIdStatus.Responses.$200>;
    /**
     * post-manga-id-status - Update Manga reading status
     */
    post: (
      parameters?: Parameters<
        Paths.PostMangaIdStatus.HeaderParameters &
          Paths.Manga$IdStatus.PathParameters
      > | null,
      data?: Paths.PostMangaIdStatus.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PostMangaIdStatus.Responses.$200>;
  };
  ["/manga/draft/{id}"]: {
    /**
     * get-manga-id-draft - Get a specific Manga Draft
     */
    get: (
      parameters?: Parameters<
        Paths.MangaDraft$Id.QueryParameters & Paths.MangaDraft$Id.PathParameters
      > | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetMangaIdDraft.Responses.$200>;
  };
  ["/manga/draft/{id}/commit"]: {
    /**
     * commit-manga-draft - Submit a Manga Draft
     */
    post: (
      parameters?: Parameters<Paths.MangaDraft$IdCommit.PathParameters> | null,
      data?: Paths.CommitMangaDraft.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.CommitMangaDraft.Responses.$201>;
  };
  ["/manga/draft"]: {
    /**
     * get-manga-drafts - Get a list of Manga Drafts
     */
    get: (
      parameters?: Parameters<Paths.MangaDraft.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetMangaDrafts.Responses.$200>;
  };
  ["/captcha/solve"]: {
    /**
     * post-captcha-solve - Solve Captcha
     *
     * Captchas can be solved explicitly through this endpoint, another way is to add a `X-Captcha-Result` header to any request. The same logic will verify the captcha and is probably more convenient because it takes one less request.
     *
     * Authentication is optional. Captchas are tracked for both the client ip and for the user id, if you are logged in you want to send your session token but that is not required.
     */
    post: (
      parameters?: Parameters<Paths.PostCaptchaSolve.HeaderParameters> | null,
      data?: Paths.PostCaptchaSolve.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PostCaptchaSolve.Responses.$200>;
  };
  ["/report/reasons/{category}"]: {
    /**
     * get-report-reasons-by-category - Get a list of report reasons
     */
    get: (
      parameters?: Parameters<Paths.ReportReasons$Category.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetReportReasonsByCategory.Responses.$200>;
  };
  ["/report"]: {
    /**
     * get-reports - Get a list of reports by the user
     */
    get: (
      parameters?: Parameters<Paths.GetReports.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetReports.Responses.$200>;
    /**
     * post-report - Create a new Report
     */
    post: (
      parameters?: Parameters<Paths.PostReport.HeaderParameters> | null,
      data?: Paths.PostReport.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PostReport.Responses.$201>;
  };
  ["/upload"]: {
    /**
     * get-upload-session - Get the current User upload session
     */
    get: (
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetUploadSession.Responses.$200>;
  };
  ["/upload/begin"]: {
    /**
     * begin-upload-session - Start an upload session
     */
    post: (
      parameters?: Parameters<Paths.BeginUploadSession.HeaderParameters> | null,
      data?: Paths.BeginUploadSession.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.BeginUploadSession.Responses.$200>;
  };
  ["/upload/begin/{chapterId}"]: {
    /**
     * begin-edit-session - Start an edit chapter session
     */
    post: (
      parameters?: Parameters<
        Paths.BeginEditSession.HeaderParameters &
          Paths.UploadBegin$ChapterId.PathParameters
      > | null,
      data?: Paths.BeginEditSession.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.BeginEditSession.Responses.$200>;
  };
  ["/upload/{uploadSessionId}"]: {
    /**
     * put-upload-session-file - Upload images to the upload session
     */
    post: (
      parameters?: Parameters<
        Paths.PutUploadSessionFile.HeaderParameters &
          Paths.Upload$UploadSessionId.PathParameters
      > | null,
      data?: Paths.PutUploadSessionFile.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PutUploadSessionFile.Responses.$200>;
    /**
     * abandon-upload-session - Abandon upload session
     */
    delete: (
      parameters?: Parameters<Paths.Upload$UploadSessionId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.AbandonUploadSession.Responses.$200>;
  };
  ["/upload/{uploadSessionId}/commit"]: {
    /**
     * commit-upload-session - Commit the upload session and specify chapter data
     */
    post: (
      parameters?: Parameters<
        Paths.CommitUploadSession.HeaderParameters &
          Paths.Upload$UploadSessionIdCommit.PathParameters
      > | null,
      data?: Paths.CommitUploadSession.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.CommitUploadSession.Responses.$200>;
  };
  ["/upload/{uploadSessionId}/{uploadSessionFileId}"]: {
    /**
     * delete-uploaded-session-file - Delete an uploaded image from the Upload Session
     */
    delete: (
      parameters?: Parameters<Paths.Upload$UploadSessionId$UploadSessionFileId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.DeleteUploadedSessionFile.Responses.$200>;
  };
  ["/upload/{uploadSessionId}/batch"]: {
    /**
     * delete-uploaded-session-files - Delete a set of uploaded images from the Upload Session
     */
    delete: (
      parameters?: Parameters<
        Paths.DeleteUploadedSessionFiles.HeaderParameters &
          Paths.Upload$UploadSessionIdBatch.PathParameters
      > | null,
      data?: Paths.DeleteUploadedSessionFiles.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.DeleteUploadedSessionFiles.Responses.$200>;
  };
  ["/upload/check-approval-required"]: {
    /**
     * upload-check-approval-required - Check if a given manga / locale for a User needs moderation approval
     */
    post: (
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UploadCheckApprovalRequired.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.UploadCheckApprovalRequired.Responses.$200>;
  };
  ["/manga/{mangaId}/relation"]: {
    /**
     * get-manga-relation - Manga relation list
     */
    get: (
      parameters?: Parameters<
        Paths.GetMangaRelation.QueryParameters &
          Paths.Manga$MangaIdRelation.PathParameters
      > | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetMangaRelation.Responses.$200>;
    /**
     * post-manga-relation - Create Manga relation
     *
     * Create a new Manga relation.
     */
    post: (
      parameters?: Parameters<
        Paths.PostMangaRelation.HeaderParameters &
          Paths.Manga$MangaIdRelation.PathParameters
      > | null,
      data?: Paths.PostMangaRelation.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PostMangaRelation.Responses.$200>;
  };
  ["/manga/{mangaId}/relation/{id}"]: {
    /**
     * delete-manga-relation-id - Delete Manga relation
     */
    delete: (
      parameters?: Parameters<Paths.Manga$MangaIdRelation$Id.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.DeleteMangaRelationId.Responses.$200>;
  };
  ["/rating"]: {
    /**
     * get-rating - Get your ratings
     */
    get: (
      parameters?: Parameters<Paths.GetRating.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetRating.Responses.$200>;
  };
  ["/rating/{mangaId}"]: {
    /**
     * post-rating-manga-id - Create or update Manga rating
     */
    post: (
      parameters?: Parameters<Paths.Rating$MangaId.PathParameters> | null,
      data?: Paths.PostRatingMangaId.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PostRatingMangaId.Responses.$200>;
    /**
     * delete-rating-manga-id - Delete Manga rating
     */
    delete: (
      parameters?: Parameters<Paths.Rating$MangaId.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.DeleteRatingMangaId.Responses.$200>;
  };
  ["/statistics/chapter/{uuid}"]: {
    /**
     * get-statistics-chapter-uuid - Get statistics about given chapter
     */
    get: (
      parameters?: Parameters<Paths.GetStatisticsChapterUuid.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetStatisticsChapterUuid.Responses.$200>;
  };
  ["/statistics/chapter"]: {
    /**
     * get-statistics-chapters - Get statistics about given chapters
     */
    get: (
      parameters?: Parameters<Paths.GetStatisticsChapters.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetStatisticsChapters.Responses.$200>;
  };
  ["/statistics/group/{uuid}"]: {
    /**
     * get-statistics-group-uuid - Get statistics about given scanlation group
     */
    get: (
      parameters?: Parameters<Paths.GetStatisticsGroupUuid.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetStatisticsGroupUuid.Responses.$200>;
  };
  ["/statistics/group"]: {
    /**
     * get-statistics-groups - Get statistics about given groups
     */
    get: (
      parameters?: Parameters<Paths.GetStatisticsGroups.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetStatisticsGroups.Responses.$200>;
  };
  ["/statistics/manga/{uuid}"]: {
    /**
     * get-statistics-manga-uuid - Get statistics about given Manga
     */
    get: (
      parameters?: Parameters<Paths.GetStatisticsMangaUuid.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetStatisticsMangaUuid.Responses.$200>;
  };
  ["/statistics/manga"]: {
    /**
     * get-statistics-manga - Find statistics about given Manga
     */
    get: (
      parameters?: Parameters<Paths.GetStatisticsManga.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetStatisticsManga.Responses.$200>;
  };
  ["/settings/template"]: {
    /**
     * get-settings-template - Get latest Settings template
     */
    get: (
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetSettingsTemplate.Responses.$200>;
    /**
     * post-settings-template - Create Settings template
     */
    post: (
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PostSettingsTemplate.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PostSettingsTemplate.Responses.$200>;
  };
  ["/settings/template/{version}"]: {
    /**
     * get-settings-template-version - Get Settings template by version id
     */
    get: (
      parameters?: Parameters<Paths.GetSettingsTemplateVersion.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetSettingsTemplateVersion.Responses.$200>;
  };
  ["/settings"]: {
    /**
     * get-settings - Get an User Settings
     */
    get: (
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetSettings.Responses.$200>;
    /**
     * post-settings - Create or update an User Settings
     */
    post: (
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PostSettings.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.PostSettings.Responses.$200>;
  };
  ["/user/history"]: {
    /**
     * get-reading-history - Get users reading history
     */
    get: (
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.GetReadingHistory.Responses.$200>;
  };
  ["/forums/thread"]: {
    /**
     * forums-thread-create - Create forums thread
     *
     * Creates a thread in the forums for the given resource, which backs the comments functionality.
     * A thread is only created if it doesn't exist yet; otherwise the preexisting thread is returned.
     *
     */
    post: (
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ForumsThreadCreate.RequestBody,
      config?: AxiosRequestConfig,
    ) => OperationResponse<Paths.ForumsThreadCreate.Responses.$200>;
  };
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>;
