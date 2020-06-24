CREATE TABLE "public"."super_admin"("user_uuid" uuid NOT NULL, PRIMARY KEY ("user_uuid") , FOREIGN KEY ("user_uuid") REFERENCES "public"."user"("uuid") ON UPDATE restrict ON DELETE cascade);
