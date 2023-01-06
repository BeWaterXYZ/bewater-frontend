import { Avatar } from '@/components/avatar';
import { TagSkill } from '@/components/tag';
import { TagRole } from '@/components/tag';

import { Dialogs } from '../store';

interface TeamJoinDialogProps {
  data: Dialogs['team_join'];
}

export default function TeamJoinDialog(props: TeamJoinDialogProps) {
  return (
    <div className="flex flex-col justify-center  ">
      <p className="body-4 text-grey my-1">{"Now You're Requesting to Join"}</p>
      <p className="heading-6">Yet another layer 2 idea</p>

      <p className="body-4 text-grey my-1 mt-3">Team Leader</p>
      <Avatar size="small" />

      <p className="body-4 text-grey my-1 mt-3">Description</p>
      <p className="body-4">Let’s make a terrific Layer 2 product!</p>

      <p className="body-4 text-grey my-1 mt-3">The team needs...</p>
      <div className="flex justify-between">
        <div className="w-1/2">
          <p className="body-5 text-grey">Roles</p>
          <div>
            <TagRole label="fe" />
            <TagRole label="be" />
            <TagRole label="fe" />
          </div>
        </div>
        <div className="w-1/2">
          <p className="body-5 text-grey">Skills</p>
          <div className="">
            <TagSkill label="react" />
            <TagSkill label="react" />
            <TagSkill label="react" />
          </div>
        </div>
      </div>
      <p className="body-4 text-grey my-1 mt-3">{"You're going to play"}</p>

      <div className="mt-4 w-full">
        <button className="btn btn-primary w-full">Request to Join</button>
      </div>
    </div>
  );
}
