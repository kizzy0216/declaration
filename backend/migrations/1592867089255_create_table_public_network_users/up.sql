CREATE TABLE "public"."network_users"("network_uuid" uuid NOT NULL, "user_uuid" uuid NOT NULL, PRIMARY KEY ("network_uuid","user_uuid") , FOREIGN KEY ("network_uuid") REFERENCES "public"."network"("uuid") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("user_uuid") REFERENCES "public"."user"("uuid") ON UPDATE restrict ON DELETE restrict);