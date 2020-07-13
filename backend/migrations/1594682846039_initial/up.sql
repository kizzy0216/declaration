CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.network (
    uuid uuid DEFAULT public.gen_random_uuid() NOT NULL,
    id bigint NOT NULL,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);
CREATE TABLE public.network_access_request (
    uuid uuid DEFAULT public.gen_random_uuid() NOT NULL,
    id bigint NOT NULL,
    requester_name text NOT NULL,
    community_name text NOT NULL,
    body text,
    requester_email text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    user_count_range int4range NOT NULL
);
CREATE SEQUENCE public.network_access_request_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.network_access_request_id_seq OWNED BY public.network_access_request.id;
CREATE SEQUENCE public.network_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.network_id_seq OWNED BY public.network.id;
CREATE TABLE public.network_membership_invitation (
    uuid uuid DEFAULT public.gen_random_uuid() NOT NULL,
    id bigint NOT NULL,
    network_uuid uuid NOT NULL,
    user_email text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    user_name text NOT NULL,
    code text,
    redirect text
);
CREATE SEQUENCE public.network_membership_invitation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.network_membership_invitation_id_seq OWNED BY public.network_membership_invitation.id;
CREATE TABLE public.network_membership_request (
    uuid uuid DEFAULT public.gen_random_uuid() NOT NULL,
    id bigint NOT NULL,
    network_uuid uuid NOT NULL,
    user_uuid uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    body text
);
CREATE SEQUENCE public.network_membership_request_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.network_membership_request_id_seq OWNED BY public.network_membership_request.id;
CREATE TABLE public.network_user (
    network_uuid uuid NOT NULL,
    user_uuid uuid NOT NULL,
    role text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    is_blocked boolean DEFAULT false
);
CREATE TABLE public.super_admin (
    user_uuid uuid NOT NULL
);
CREATE TABLE public."user" (
    uuid uuid DEFAULT public.gen_random_uuid() NOT NULL,
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    name text,
    email text NOT NULL,
    is_verified boolean DEFAULT false NOT NULL
);
CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
CREATE TABLE public.user_profile (
    uuid uuid DEFAULT public.gen_random_uuid() NOT NULL,
    id bigint NOT NULL,
    user_uuid uuid NOT NULL,
    username text NOT NULL,
    date_of_birth date NOT NULL,
    location text,
    gender text,
    personal_bio text,
    work_bio text,
    work_title text,
    work_place text,
    educational_institution text,
    photo text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE SEQUENCE public.user_profile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.user_profile_id_seq OWNED BY public.user_profile.id;
CREATE TABLE public.user_role (
    text text NOT NULL,
    comment text NOT NULL
);
INSERT INTO user_role VALUES ('NETWORK_ADMIN', 'Network Admin'), ('COMMUNITY_MANAGER', 'Community Manager'),('MEMBER', 'Member');
CREATE TABLE public.verification_code (
    uuid uuid DEFAULT public.gen_random_uuid() NOT NULL,
    text text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    id bigint NOT NULL,
    email text NOT NULL,
    redirect text NOT NULL
);
CREATE SEQUENCE public.verification_code_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.verification_code_id_seq OWNED BY public.verification_code.id;
ALTER TABLE ONLY public.network ALTER COLUMN id SET DEFAULT nextval('public.network_id_seq'::regclass);
ALTER TABLE ONLY public.network_access_request ALTER COLUMN id SET DEFAULT nextval('public.network_access_request_id_seq'::regclass);
ALTER TABLE ONLY public.network_membership_invitation ALTER COLUMN id SET DEFAULT nextval('public.network_membership_invitation_id_seq'::regclass);
ALTER TABLE ONLY public.network_membership_request ALTER COLUMN id SET DEFAULT nextval('public.network_membership_request_id_seq'::regclass);
ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
ALTER TABLE ONLY public.user_profile ALTER COLUMN id SET DEFAULT nextval('public.user_profile_id_seq'::regclass);
ALTER TABLE ONLY public.verification_code ALTER COLUMN id SET DEFAULT nextval('public.verification_code_id_seq'::regclass);
ALTER TABLE ONLY public.network_access_request
    ADD CONSTRAINT network_access_request_pkey PRIMARY KEY (uuid);
ALTER TABLE ONLY public.network
    ADD CONSTRAINT network_id_key UNIQUE (id);
ALTER TABLE ONLY public.network_membership_invitation
    ADD CONSTRAINT network_membership_invitation_codet_key UNIQUE (code);
ALTER TABLE ONLY public.network_membership_invitation
    ADD CONSTRAINT network_membership_invitation_pkey PRIMARY KEY (uuid);
ALTER TABLE ONLY public.network_membership_invitation
    ADD CONSTRAINT network_membership_invitation_user_email_key UNIQUE (user_email);
ALTER TABLE ONLY public.network_membership_request
    ADD CONSTRAINT network_membership_request_id_key UNIQUE (id);
ALTER TABLE ONLY public.network_membership_request
    ADD CONSTRAINT network_membership_request_pkey PRIMARY KEY (uuid);
ALTER TABLE ONLY public.network
    ADD CONSTRAINT network_name_key UNIQUE (name);
ALTER TABLE ONLY public.network
    ADD CONSTRAINT network_pkey PRIMARY KEY (uuid);
ALTER TABLE ONLY public.network_user
    ADD CONSTRAINT network_users_pkey PRIMARY KEY (network_uuid, user_uuid);
ALTER TABLE ONLY public.super_admin
    ADD CONSTRAINT super_admin_pkey PRIMARY KEY (user_uuid);
ALTER TABLE ONLY public.super_admin
    ADD CONSTRAINT super_admin_user_uuid_key UNIQUE (user_uuid);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_id_key UNIQUE (id);
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (uuid);
ALTER TABLE ONLY public.user_profile
    ADD CONSTRAINT user_profile_pkey PRIMARY KEY (uuid);
ALTER TABLE ONLY public.user_profile
    ADD CONSTRAINT user_profile_user_uuid_key UNIQUE (user_uuid);
ALTER TABLE ONLY public.user_profile
    ADD CONSTRAINT user_profile_username_key UNIQUE (username);
ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (text);
ALTER TABLE ONLY public.verification_code
    ADD CONSTRAINT verification_code_email_key UNIQUE (email);
ALTER TABLE ONLY public.verification_code
    ADD CONSTRAINT verification_code_pkey PRIMARY KEY (uuid);
CREATE TRIGGER set_public_network_access_request_updated_at BEFORE UPDATE ON public.network_access_request FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_network_access_request_updated_at ON public.network_access_request IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_network_membership_invitation_updated_at BEFORE UPDATE ON public.network_membership_invitation FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_network_membership_invitation_updated_at ON public.network_membership_invitation IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_network_membership_request_updated_at BEFORE UPDATE ON public.network_membership_request FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_network_membership_request_updated_at ON public.network_membership_request IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_network_updated_at BEFORE UPDATE ON public.network FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_network_updated_at ON public.network IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_network_user_updated_at BEFORE UPDATE ON public.network_user FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_network_user_updated_at ON public.network_user IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_user_profile_updated_at BEFORE UPDATE ON public.user_profile FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_user_profile_updated_at ON public.user_profile IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_user_updated_at BEFORE UPDATE ON public."user" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_user_updated_at ON public."user" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_verification_code_updated_at BEFORE UPDATE ON public.verification_code FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_verification_code_updated_at ON public.verification_code IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public.network_membership_invitation
    ADD CONSTRAINT network_membership_invitation_network_uuid_fkey FOREIGN KEY (network_uuid) REFERENCES public.network(uuid) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.network_membership_request
    ADD CONSTRAINT network_membership_request_network_uuid_fkey FOREIGN KEY (network_uuid) REFERENCES public.network(uuid) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.network_membership_request
    ADD CONSTRAINT network_membership_request_user_uuid_fkey FOREIGN KEY (user_uuid) REFERENCES public."user"(uuid) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.network_user
    ADD CONSTRAINT network_user_role_fkey FOREIGN KEY (role) REFERENCES public.user_role(text) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.network_user
    ADD CONSTRAINT network_users_network_uuid_fkey FOREIGN KEY (network_uuid) REFERENCES public.network(uuid) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.network_user
    ADD CONSTRAINT network_users_user_uuid_fkey FOREIGN KEY (user_uuid) REFERENCES public."user"(uuid) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.super_admin
    ADD CONSTRAINT super_admin_user_uuid_fkey FOREIGN KEY (user_uuid) REFERENCES public."user"(uuid) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.user_profile
    ADD CONSTRAINT user_profile_user_uuid_fkey FOREIGN KEY (user_uuid) REFERENCES public."user"(uuid) ON UPDATE RESTRICT ON DELETE CASCADE;
