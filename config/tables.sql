CREATE TABLE "users" (
	"id" serial NOT NULL PRIMARY KEY,
	"email" TEXT NOT NULL UNIQUE,
	"username" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"imgUrl" TEXT,
	"createdAt" timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE "sessions" (
	"id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES "users"("id"), 
);

CREATE TABLE "posts" (
	"id" serial NOT NULL PRIMARY KEY,
	"userid" integer NOT NULL REFERENCES users(id),
	"text" TEXT,
	"url" TEXT NOT NULL,
	"createdAt" timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE "likes" (
	"id" serial NOT NULL PRIMARY KEY,
	"userId" integer NOT NULL REFERENCES users(id),
	"postId" integer NOT NULL REFERENCES posts(id),
	"createdAt" timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE "hashtags" (
	"id" serial NOT NULL PRIMARY KEY,
	"name" TEXT NOT NULL UNIQUE
);

CREATE TABLE "hashtagsPosts" (
	"id" serial NOT NULL PRIMARY KEY,
	"hashtagId" integer NOT NULL REFERENCES hashtags(id),
	"postId" integer NOT NULL REFERENCES posts(id)
);