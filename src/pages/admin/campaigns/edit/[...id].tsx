import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../../../components/Layout";
import CampaignForm from "../../../../../components/CampaignForm";

interface Campaign{
  id?: string;
  title?: string;
  description?: string;
  targetedAmount?: string;
}

export default function EditCampaignPage(){
    const router = useRouter();
    const [campaignInfo, setCampaignInfo] = useState <Campaign | null>(null);
    const {id} = router.query;

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/api/campaigns?id=${id}`).then(response => {
            setCampaignInfo(response.data);
        });
    }, [id])

    return (
        <Layout>
            {campaignInfo && (
                <CampaignForm {...campaignInfo} />
            )}
        </Layout>
    )
}