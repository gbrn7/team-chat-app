import { useSocket } from "@/components/providers/socket-proveder";
import { useSocket } from "@/components/providers/socket-proveder";
import { ChatQueryProps } from '@/hooks/use-chat-query';
import { useSocket } from "@/components/providers/socket-proveder";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useParams } from "next/navigation";
import { useParams } from "next/navigation";
import { NextResponse } from "next/server"
import qs from "query-string";
import qs from "query-string";
import {v4 as uuidv4} from "uuid"

export async function PATCH(
  req: Request,
  {params} : {params : {serverId : string}}
){
  try {
    const profile = await currentProfile();
    
    if(!profile){
      return new NextResponse("Unauthorized", {status: 401});
    }

    if(!params.serverId){
      return new NextResponse("Server ID Missing", {status: 400});
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuidv4(),
      }
    });

    return NextResponse.json(server);

  } catch (error) {
    console.log("[SERVER_ID]", error)
    return new NextResponse("Internal Error", {status: 500})
  }
}
export const userChatQuery = ({
  queryKey, apiUrl, paramKey, paramValue
}: ChatQueryProps) => {
  const { isConnected } = useSocket();
  const params = useParams();

  const fetchMessages = async ({ pageParams = undefined }) => {
    const url = qs.stringifyUrl({
      url: apiUrl,
      query: {
        cursor: pageParams,
        [paramKey]: paramValue
      }
    }, { skipNull: false });

    const res = await fetch(url);
    return res.json();
  };


  const {
    data, fetchNextPage, hasNextPage, isFetchingNextPage, status,
  } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: '',
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    refetchInterval: isConnected ? false : 1000
  });

};
