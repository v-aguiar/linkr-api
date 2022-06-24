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

CREATE TABLE "friends" (
    id serial PRIMARY KEY,
    "userId" integer NOT NULL,
    "friendId" integer NOT NULL,
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT friends_userid_fkey FOREIGN KEY ("userId")
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT friends_friendid_fkey FOREIGN KEY ("friendId")
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE "sharedPosts" (
	"id" serial NOT NULL PRIMARY KEY,
	"userId" integer NOT NULL REFERENCES users(id),
	"postId" integer NOT NULL REFERENCES posts(id),
	"createdAt" timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE "followers" (
	"id" serial NOT NULL PRIMARY KEY,
	"followerId" INTEGER NOT NULL REFERENCES "users"("id"),
	"followedId" INTEGER NOT NULL REFERENCES "users"("id")
);

CREATE TABLE "postStatus" (
	"id" INTEGER PRIMARY KEY,
	"name" TEXT NOT NULL UNIQUE
);

CREATE TABLE "reposts"(
	"id" serial NOT NULL PRIMARY KEY,
	"postId" integer NOT NULL REFERENCES posts(id),
	"userId" integer NOT NULL REFERENCES users(id),
	"createdAt" timestamp NOT NULL DEFAULT NOW()
);