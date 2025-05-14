import DeleteTeamModal from "@/features/team/components/delete-team-modal";
import { getTeamById } from "@/features/team/services/team.service";

type Props = {
  params: {
    teamId: string;
  };
};

const DeleteTeamIntercept = async ({ params }: Props) => {
  const data = await getTeamById(Number(params?.teamId));
  if (!data) return null;

  return <DeleteTeamModal data={data} />;
};

export default DeleteTeamIntercept;
