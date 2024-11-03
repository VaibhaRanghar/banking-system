"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useRouter } from "next/navigation";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/user.actions";
import Image from "next/image";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    };

    getLinkToken();
  }, []);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      console.log("ROUTEEEEE PUSHHHHHHHHHHH");
      router.push("/");
      // await exchangePublicToken({
      //   publicToken: public_token,
      //   user,
      // });
    },
    [user]
  );
  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };
  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === "primary" ? (
        <Button
          onClick={() => {
            open();
            router.push("/");
          }}
          disabled={!ready}
          className="plaidlink-primary"
        >
          Connect Bank
        </Button>
      ) : variant === "ghost" ? (
        <Button
          onClick={() => {
            open();
            router.push("/");
          }}
          variant={"ghost"}
          className="plaidlink-ghost"
        >
          <Image
            src={"/icons/connect-bang.svg"}
            alt="connect bank"
            width={24}
            height={24}
          />{" "}
          <p className=" hidden text-[16px] font-semibold text-black-2 xl:block">
            Connect Bank
          </p>
        </Button>
      ) : (
        <Button
          onClick={() => {
            open();
            router.push("/");
          }}
          className="plaidlink-default"
        >
          <Image
            src={"/icons/connect-bank.svg"}
            alt="connect bank"
            width={24}
            height={24}
          />{" "}
          <p className="text-[16px] font-semibold text-black-2">Connect Bank</p>
        </Button>
      )}
    </>
  );
};

export default PlaidLink;
