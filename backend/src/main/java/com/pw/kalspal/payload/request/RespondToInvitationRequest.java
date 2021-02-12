package com.pw.kalspal.payload.request;

import javax.validation.constraints.NotNull;

public class RespondToInvitationRequest {

    @NotNull
    private String invitation_id;
    @NotNull
    private String action;

    public RespondToInvitationRequest(String invitation_id, String action) {
        this.invitation_id = invitation_id;
        this.action = action;
    }

    public RespondToInvitationRequest() {
    }

    public String getInvitation_id() {
        return invitation_id;
    }

    public void setInvitation_id(String invitation_id) {
        this.invitation_id = invitation_id;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }
}
