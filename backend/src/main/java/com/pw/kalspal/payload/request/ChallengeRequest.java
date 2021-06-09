package com.pw.kalspal.payload.request;

import javax.validation.constraints.NotNull;

public class ChallengeRequest {
    @NotNull
    private String invited;
    @NotNull
    private String text;

    public ChallengeRequest(String invited, String text) {
        this.invited = invited;
        this.text = text;
    }

    public String getInvited() {
        return invited;
    }

    public void setInvited(String invited) {
        this.invited = invited;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
