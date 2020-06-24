CREATE TABLE "public"."network_user_role"("network_uuid" uuid NOT NULL, "user_uuid" uuid NOT NULL, "role" text NOT NULL, PRIMARY KEY ("network_uuid","user_uuid") , FOREIGN KEY ("network_uuid") REFERENCES "public"."network"("uuid") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("user_uuid") REFERENCES "public"."user"("uuid") ON UPDATE restrict ON DELETE cascade);