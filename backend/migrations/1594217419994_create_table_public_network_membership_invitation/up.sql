CREATE TABLE "public"."network_membership_invitation"("uuid" uuid NOT NULL, "id" bigserial NOT NULL, "network_uuid" uuid NOT NULL, "user_email" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "user_name" text NOT NULL, PRIMARY KEY ("uuid") , FOREIGN KEY ("network_uuid") REFERENCES "public"."network"("uuid") ON UPDATE restrict ON DELETE cascade, UNIQUE ("uuid"), UNIQUE ("user_email"));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_network_membership_invitation_updated_at"
BEFORE UPDATE ON "public"."network_membership_invitation"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_network_membership_invitation_updated_at" ON "public"."network_membership_invitation" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
