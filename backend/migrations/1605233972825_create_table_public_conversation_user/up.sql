CREATE TABLE "public"."conversation_user"("user_uuid" uuid NOT NULL, "conversation_uuid" uuid NOT NULL, "last_typed_at" timestamptz NOT NULL DEFAULT now(), "last_read_at" timestamptz NOT NULL DEFAULT now(), "is_hidden" boolean NOT NULL DEFAULT false, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("user_uuid","conversation_uuid") , FOREIGN KEY ("user_uuid") REFERENCES "public"."user"("uuid") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("conversation_uuid") REFERENCES "public"."conversation"("uuid") ON UPDATE cascade ON DELETE cascade);
