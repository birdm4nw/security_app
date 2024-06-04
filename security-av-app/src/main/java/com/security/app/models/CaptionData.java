package com.security.app.models;

public class CaptionData {

    private String fileId;
    private String filename;
    private String capturedAt;
    private int evalConf;

    public CaptionData() {
    }

    // Getters y setters
    public String getFileId() {
        return fileId;
    }

    public void setFileId(String fileId) {
        this.fileId = fileId;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getCapturedAt() {
        return capturedAt;
    }

    public void setCapturedAt(String capturedAt) {
        this.capturedAt = capturedAt;
    }

    public int getEvalConf() {
        return evalConf;
    }

    public void setEvalConf(int evalConf) {
        this.evalConf = evalConf;
    }
}
