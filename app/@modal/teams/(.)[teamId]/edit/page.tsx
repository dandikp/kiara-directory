import EditTeamModal from "@/features/team/components/edit-team-modal";
import { getTeamById } from "@/features/team/services/team.service";

type Props = {
  params: {
    teamId: string;
  };
};

const EditTeamIntercept = async ({ params }: Props) => {
  const data = await getTeamById(Number(params?.teamId));
  if (!data) return null;

  return <EditTeamModal data={data} />;
};

export default EditTeamIntercept;
